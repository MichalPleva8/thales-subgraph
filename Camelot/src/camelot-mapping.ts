/* eslint-disable no-empty */
import { CancelRedeem, Convert, Redeem } from '../generated/XGrailToken/XGrailToken';
import { XGrailHolder } from '../generated/schema';

export function handleConvertEvent(event: Convert): void {
  let holder = XGrailHolder.load(event.params.to.toHex());
  if (holder === null) {
    holder = new XGrailHolder(event.params.to.toHex());
    holder.address = event.params.to;
    holder.timestamp = event.block.timestamp;
    holder.blockNumber = event.block.number;
    holder.save();
  }
}

export function handleRedeemEvent(event: Redeem): void {
  let holder = XGrailHolder.load(event.params.userAddress.toHex());
  if (holder === null) {
    holder = new XGrailHolder(event.params.userAddress.toHex());
    holder.address = event.params.userAddress;
    holder.timestamp = event.block.timestamp;
    holder.blockNumber = event.block.number;
    holder.save();
  }
}

export function handleCancelRedeemEvent(event: CancelRedeem): void {
  let holder = XGrailHolder.load(event.params.userAddress.toHex());
  if (holder === null) {
    holder = new XGrailHolder(event.params.userAddress.toHex());
    holder.address = event.params.userAddress;
    holder.timestamp = event.block.timestamp;
    holder.blockNumber = event.block.number;
    holder.save();
  }
}
