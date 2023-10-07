import {
  Deposit as DepositEvent,
  JobPosted as JobPostedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  ProposalSent as ProposalSentEvent,
  Transfer as TransferEvent,
  Withdrawal as WithdrawalEvent
} from "../generated/Fairlance/Fairlance"
import {
  Deposit,
  JobPosted,
  OwnershipTransferred,
  ProposalSent,
  Transfer,
  Withdrawal
} from "../generated/schema"

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleJobPosted(event: JobPostedEvent): void {
  let entity = new JobPosted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Fairlance_id = event.params.id
  entity.title = event.params.title
  entity.description = event.params.description
  entity.deadline = event.params.deadline
  entity.minimumPrice = event.params.minimumPrice
  entity.maximumPrice = event.params.maximumPrice
  entity.inProgress = event.params.inProgress
  entity.isDone = event.params.isDone
  entity.owner = event.params.owner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProposalSent(event: ProposalSentEvent): void {
  let entity = new ProposalSent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Fairlance_id = event.params.id
  entity.jobId = event.params.jobId
  entity.sender = event.params.sender
  entity.cost = event.params.cost
  entity.details = event.params.details
  entity.expectedFinishDate = event.params.expectedFinishDate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.receiver = event.params.receiver
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawal(event: WithdrawalEvent): void {
  let entity = new Withdrawal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.receiver = event.params.receiver
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
