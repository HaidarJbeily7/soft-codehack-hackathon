import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Deposit,
  JobPosted,
  OwnershipTransferred,
  ProposalSent,
  Transfer,
  Withdrawal
} from "../generated/Fairlance/Fairlance"

export function createDepositEvent(sender: Address, amount: BigInt): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return depositEvent
}

export function createJobPostedEvent(
  id: BigInt,
  title: string,
  description: string,
  deadline: BigInt,
  minimumPrice: BigInt,
  maximumPrice: BigInt,
  inProgress: boolean,
  isDone: boolean,
  owner: Address
): JobPosted {
  let jobPostedEvent = changetype<JobPosted>(newMockEvent())

  jobPostedEvent.parameters = new Array()

  jobPostedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  jobPostedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  jobPostedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  jobPostedEvent.parameters.push(
    new ethereum.EventParam(
      "deadline",
      ethereum.Value.fromUnsignedBigInt(deadline)
    )
  )
  jobPostedEvent.parameters.push(
    new ethereum.EventParam(
      "minimumPrice",
      ethereum.Value.fromUnsignedBigInt(minimumPrice)
    )
  )
  jobPostedEvent.parameters.push(
    new ethereum.EventParam(
      "maximumPrice",
      ethereum.Value.fromUnsignedBigInt(maximumPrice)
    )
  )
  jobPostedEvent.parameters.push(
    new ethereum.EventParam(
      "inProgress",
      ethereum.Value.fromBoolean(inProgress)
    )
  )
  jobPostedEvent.parameters.push(
    new ethereum.EventParam("isDone", ethereum.Value.fromBoolean(isDone))
  )
  jobPostedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return jobPostedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createProposalSentEvent(
  id: BigInt,
  jobId: BigInt,
  sender: Address,
  cost: BigInt,
  details: string,
  expectedFinishDate: BigInt
): ProposalSent {
  let proposalSentEvent = changetype<ProposalSent>(newMockEvent())

  proposalSentEvent.parameters = new Array()

  proposalSentEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  proposalSentEvent.parameters.push(
    new ethereum.EventParam("jobId", ethereum.Value.fromUnsignedBigInt(jobId))
  )
  proposalSentEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  proposalSentEvent.parameters.push(
    new ethereum.EventParam("cost", ethereum.Value.fromUnsignedBigInt(cost))
  )
  proposalSentEvent.parameters.push(
    new ethereum.EventParam("details", ethereum.Value.fromString(details))
  )
  proposalSentEvent.parameters.push(
    new ethereum.EventParam(
      "expectedFinishDate",
      ethereum.Value.fromUnsignedBigInt(expectedFinishDate)
    )
  )

  return proposalSentEvent
}

export function createTransferEvent(
  sender: Address,
  receiver: Address,
  amount: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return transferEvent
}

export function createWithdrawalEvent(
  receiver: Address,
  amount: BigInt
): Withdrawal {
  let withdrawalEvent = changetype<Withdrawal>(newMockEvent())

  withdrawalEvent.parameters = new Array()

  withdrawalEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  withdrawalEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawalEvent
}
