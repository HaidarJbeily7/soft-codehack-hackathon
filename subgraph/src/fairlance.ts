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
  entity.job_id = event.params.job.id
  entity.job_title = event.params.job.title
  entity.job_description = event.params.job.description
  entity.job_deadline = event.params.job.deadline
  entity.job_minimumPrice = event.params.job.minimumPrice
  entity.job_maximumPrice = event.params.job.maximumPrice
  entity.job_inProgress = event.params.job.inProgress
  entity.job_isDone = event.params.job.isDone
  entity.job_owner = event.params.job.owner

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
  entity.proposal_id = event.params.proposal.id
  entity.proposal_jobId = event.params.proposal.jobId
  entity.proposal_sender = event.params.proposal.sender
  entity.proposal_cost = event.params.proposal.cost
  entity.proposal_details = event.params.proposal.details
  entity.proposal_expectedFinishDate = event.params.proposal.expectedFinishDate

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
