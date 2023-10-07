// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract Fairlance is Ownable {
    struct Job {
        uint256 id;
        string title;
        string description;
        uint256 deadline;
        uint256 minimumPrice;
        uint256 maximumPrice;
        bool inProgress;
        bool isDone;
        address owner;
    }

    struct Proposal {
        uint256 id;
        uint256 jobId;
        address sender;
        uint256 cost;
        string details;
        uint256 expectedFinishDate;
    }

    struct ProposalsBucket {
        Proposal[] proposals;
    }

    event JobPosted(Job indexed job);
    event ProposalSent(Proposal indexed proposal);
    event Deposit(address sender, uint amount);
    event Withdrawal(address receiver, uint amount);
    event Transfer(address sender, address receiver, uint amount);

    uint256 jobId;
    uint256 proposalId;
    mapping(address => uint256) public balances;
    mapping(address => uint256) public onholdBalances;
    mapping(uint256 => Job) public jobIdToJob;
    mapping(uint256 => Proposal) public proposalIdToProposal;
    mapping(uint256 => ProposalsBucket) jobToProposalsMapping;
    mapping(uint256 => uint256) jobToNumberOfProposls;
    mapping(uint256 => Proposal) jobToAcceptedProposal;

    // Modifiers
    bool internal locked;
    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }

    modifier validJobId(uint256 _id) {
        require(_id < jobId, "Invalid Job Id");
        _;
    }

    modifier validProposalId(uint256 _id) {
        require(_id < proposalId, "Invalid Proposal Id");
        _;
    }

    constructor() Ownable(msg.sender) {
        jobId = 1;
        proposalId = 1;
    }

    function postJob(
        string memory _title,
        string memory _description,
        uint256 _deadline,
        uint256 _minimumPrice,
        uint256 _maximumPrice
    ) external payable noReentrant {
        require(
            balances[msg.sender] >= _maximumPrice,
            "you should have the maximumPrice in your balance"
        );

        Job memory job = Job(
            jobId,
            _title,
            _description,
            _deadline,
            _minimumPrice,
            _maximumPrice,
            false,
            false,
            msg.sender
        );
        jobToNumberOfProposls[jobId] = 0;
        jobId++;
        onholdBalances[msg.sender] += _maximumPrice;
        balances[msg.sender] -= _maximumPrice;
        emit JobPosted(job);
    }

    function sendProposal(
        uint256 _jobId,
        uint256 _cost,
        string memory _details,
        uint256 expectedFinishDate
    ) public {
        Job memory job = getJobById(_jobId);
        require(!job.isDone, "Cannot send proposal to completed job");
        require(!job.inProgress, "Cannot send proposal to inprogress job");

        require(
            expectedFinishDate > block.timestamp,
            "expectedFinishDate should be in the future"
        );

        require(
            expectedFinishDate < job.deadline,
            "expectedFinishDate should be before deadline"
        );

        require(
            _cost <= job.maximumPrice && _cost >= job.minimumPrice,
            "Cost should be between maximumPrice and minimumPrice"
        );

        Proposal memory proposal = Proposal(
            proposalId,
            _jobId,
            msg.sender,
            _cost,
            _details,
            expectedFinishDate
        );
        jobToNumberOfProposls[jobId] += 1;
        jobToProposalsMapping[jobId].proposals.push(proposal);
        proposalIdToProposal[proposalId] = proposal;
        proposalId++;
        emit ProposalSent(proposal);
    }

    function acceptProposal(
        uint256 _proposalId
    ) public validProposalId(_proposalId) {
        Proposal memory proposal = proposalIdToProposal[_proposalId];
        Job memory job = getJobById(proposal.jobId);
        require(!job.isDone, "Cannot accept proposal to completed job");
        require(!job.inProgress, "Cannot accept proposal to inprogress job");
        job.inProgress = true;
        jobIdToJob[job.id] = job;
        require(job.owner == msg.sender, "Only Job owner can take this action");
        jobToAcceptedProposal[proposal.jobId] = proposal;
    }

    function completeJob(uint256 _jobId) public noReentrant {
        Job memory job = getJobById(_jobId);
        require(!job.isDone, "Cannot complete Job to completed job");
        require(job.inProgress, "Cannot complete Job to not inprogress job");
        require(
            msg.sender == job.owner,
            "Only Job owner can access this action"
        );
        job.isDone = true;
        job.inProgress = false;
        jobIdToJob[_jobId] = job;
        Proposal memory acceptedProposal = jobToAcceptedProposal[_jobId];
        onholdBalances[msg.sender] -= job.maximumPrice;
        balances[msg.sender] += (job.maximumPrice - acceptedProposal.cost);
        balances[acceptedProposal.sender] += acceptedProposal.cost;
    }

    function getJobById(
        uint256 _id
    ) public view validJobId(_id) returns (Job memory) {
        return jobIdToJob[_id];
    }

    function deposit() public payable noReentrant {
        emit Deposit(msg.sender, msg.value);
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public noReentrant {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        emit Withdrawal(msg.sender, amount);
        balances[msg.sender] -= amount;
    }

    function transfer(address receiver, uint256 amount) public noReentrant {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        emit Transfer(msg.sender, receiver, amount);
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
    }

    function releaseOnHoldBalance(uint256 _jobId) external onlyOwner {
        Job memory job = getJobById(_jobId);
        onholdBalances[job.owner] -= job.maximumPrice;
        balances[job.owner] += job.maximumPrice;
    }
}
