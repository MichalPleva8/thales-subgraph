/* eslint-disable no-empty */
import { BigInt } from '@graphprotocol/graph-ts';
import { TradeExecuted, RoundClosed, VaultStarted } from '../generated/DiscountVault/SportVault';
import { MarketToGameId, SportMarket, Vault, VaultPnl, VaultTransaction } from '../generated/schema';

export function handleVaultStarted(event: VaultStarted): void {
  let vault = new Vault(event.address.toHex());
  vault.address = event.address;
  vault.round = BigInt.fromI32(1);
  vault.save();
}

export function handleVaultTrade(event: TradeExecuted): void {
  let transaction = new VaultTransaction(event.transaction.hash.toHexString() + '-' + event.logIndex.toString());

  let marketToGameId = MarketToGameId.load(event.params.market.toHex());
  if (marketToGameId !== null) {
    let market = SportMarket.load(marketToGameId.gameId.toHex());
    if (market !== null) {
      transaction.vault = event.address;
      transaction.hash = event.transaction.hash;
      transaction.timestamp = event.block.timestamp;
      transaction.blockNumber = event.block.number;
      transaction.amount = event.params.amount;
      transaction.position = BigInt.fromI32(event.params.position);
      transaction.market = event.params.market;
      transaction.paid = event.params.quote;
      transaction.wholeMarket = market.id;

      let vault = Vault.load(event.address.toHex());
      if (vault !== null) {
        transaction.round = vault.round;
      }

      transaction.save();
    }
  }
}

export function handleRoundClosed(event: RoundClosed): void {
  let vaultPnl = new VaultPnl(event.transaction.hash.toHexString() + '-' + event.logIndex.toString());
  vaultPnl.vault = event.address;
  vaultPnl.timestamp = event.block.timestamp;
  vaultPnl.round = event.params.round;
  vaultPnl.pnl = event.params.roundPnL;

  let vault = Vault.load(event.address.toHex());
  if (vault !== null) {
    vault.round = event.params.round.plus(BigInt.fromI32(1));
    vault.save();
  }

  vaultPnl.save();
}
