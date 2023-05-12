globalThis.examples = globalThis.examples || [];
examples.push(
	{
        "name": "Paxos",
        "objects": [
            {
                "class": "Proposer",
                "name": "proposerA",
                "behavior": `
                    state prepareChoice <<choice>>
                    [*] --> InitializeSystem: / acceptedPrepareCount = 0;\\n proposerAddress = "proposerA";\\n acceptorList = ["acceptorA", "acceptorB"];\\n proposalNumber = 1;\\n proposalValue = 11;
                    InitializeSystem --> Wait: / for (const acceptor of acceptorList)\\n {this[acceptor].prepare(proposalNumber, proposerAddress); \\n}
                    Wait --> prepareChoice: prepareOk(acceptedProposalNumber, acceptedValue) / acceptedPrepareCount++; \\n acceptedProposalNumber = acceptedProposalNumber;  acceptedValue = acceptedValue;
                    prepareChoice --> ProcessSuccessfulPrepareResponse : [acceptedProposalNumber != null && (seenAcceptedProposalNumber == null || acceptedProposalNumber > seenAcceptedProposalNumber)] / proposedValue = acceptedValue; \\n seenAcceptedProposalNumber = acceptedProposalNumber;
                    prepareChoice --> ProcessSuccessfulPrepareResponse : [else]
                    ProcessSuccessfulPrepareResponse --> Wait: [acceptedPrepareCount < (acceptorList.length)/2]
                    ProcessSuccessfulPrepareResponse --> SendOutAcceptRequests: [acceptedPrepareCount >= (acceptorList.length)/2] / for (var acceptor of acceptorList)\\n {this[acceptor].accept(proposalNumber, proposalValue); \\n}
                `,
                "features": `
                    acceptorList : array
                    proposalNumber : int
                    proposalValue : int
                    proposerAddress : string
                    acceptedPrepareCount : int
                    acceptedProposalNumber :  int
                    acceptedValue : int
                    seenAcceptedProposalNumber : int
    
                `,
            },
            {
                "class": "Proposer",
                "name": "proposerB",
                "behavior": `
                    state prepareChoice <<choice>>
                    [*] --> InitializeSystem: / acceptedPrepareCount = 0;\\n proposerAddress = "proposerB";\\n acceptorList = ["acceptorA", "acceptorB"];\\n proposalNumber = 2;\\n proposalValue = 22;
                    InitializeSystem --> Wait: / for (const acceptor of acceptorList)\\n {this[acceptor].prepare(proposalNumber, proposerAddress); \\n}
                    Wait --> prepareChoice: prepareOk(acceptedProposalNumber, acceptedValue) / acceptedPrepareCount++; \\n acceptedProposalNumber = acceptedProposalNumber;  acceptedValue = acceptedValue;
                    prepareChoice --> ProcessSuccessfulPrepareResponse : [acceptedProposalNumber != null && (seenAcceptedProposalNumber == null || acceptedProposalNumber > seenAcceptedProposalNumber)] / proposedValue = acceptedValue; \\n seenAcceptedProposalNumber = acceptedProposalNumber;
                    prepareChoice --> ProcessSuccessfulPrepareResponse : [else]
                    ProcessSuccessfulPrepareResponse --> Wait: [acceptedPrepareCount < (acceptorList.length)/2]
                    ProcessSuccessfulPrepareResponse --> SendOutAcceptRequests: [acceptedPrepareCount >= (acceptorList.length)/2] / for (var acceptor of acceptorList)\\n {this[acceptor].accept(proposalNumber, proposalValue); \\n}
                `,
                "features": `
                    acceptorList : array
                    proposalNumber : int
                    proposalValue : int
                    proposerAddress : string
                    acceptedPrepareCount : int
                    acceptedProposalNumber :  int
                    acceptedValue : int
                    seenAcceptedProposalNumber : int
    
                `,
            },
            {
                "class": "Acceptor",
                "name": "acceptorA",
                "behavior": `
                    [*] --> InitializeSystem
                    InitializeSystem --> Wait: / proposalNumber = 0; acceptedValue = 0; console.log(acceptedValue)
                    Wait --> AcceptPrepare: prepare(requestedProposalNumber, proposerAddress) / requestedProposalNumber = requestedProposalNumber; proposerAddress = proposerAddress;
                    AcceptPrepare --> Wait : [proposalNumber != 0 && requestedProposalNumber <= proposalNumber]
                    AcceptPrepare --> Wait : [proposalNumber == 0 ||(proposalNumber != 0 && acceptedValue == null)] / this[proposerAddress].prepareOk(requestedProposalNumber, 0); \\n proposalNumber = requestedProposalNumber;
                    AcceptPrepare --> Wait: [else] / this[proposerAddress].prepareOk(proposalNumber, acceptedValue); \\n proposalNumber = requestedProposalNumber;
                    Wait --> AcceptAccept: accept(requestedProposalNumber, requestedAcceptedValue) / requestedProposalNumber = requestedProposalNumber; requestedAcceptedValue = requestedAcceptedValue;
                    AcceptAccept --> Wait : [proposalNumber != 0 && requestedProposalNumber <= proposalNumber]
                    AcceptAccept --> Wait : [else] / acceptedValue = requestedAcceptedValue; proposalNumber = requestedProposalNumber; learner.notifyAccept("acceptorA", acceptedValue);
                `,
                "features": `
                    proposalNumber : int
                    acceptedValue: int
                    requestedProposalNumber: int
                    requestedAcceptedValue: int
                    proposerAddress: string
                `,
            },
            {
                "class": "Acceptor",
                "name": "acceptorB",
                "behavior": `
                    [*] --> InitializeSystem
                    InitializeSystem --> Wait: / proposalNumber = 0; acceptedValue = 0; console.log(acceptedValue)
                    Wait --> AcceptPrepare: prepare(requestedProposalNumber, proposerAddress) / requestedProposalNumber = requestedProposalNumber; proposerAddress = proposerAddress;
                    AcceptPrepare --> Wait : [proposalNumber != 0 && requestedProposalNumber <= proposalNumber]
                    AcceptPrepare --> Wait : [proposalNumber == 0 ||(proposalNumber != 0 && acceptedValue == null)] / this[proposerAddress].prepareOk(requestedProposalNumber, 0); \\n proposalNumber = requestedProposalNumber;
                    AcceptPrepare --> Wait: [else] / this[proposerAddress].prepareOk(proposalNumber, acceptedValue); \\n proposalNumber = requestedProposalNumber;
                    Wait --> AcceptAccept: accept(requestedProposalNumber, requestedAcceptedValue) / requestedProposalNumber = requestedProposalNumber; requestedAcceptedValue = requestedAcceptedValue;
                    AcceptAccept --> Wait : [proposalNumber != 0 && requestedProposalNumber <= proposalNumber]
                    AcceptAccept --> Wait : [else] / acceptedValue = requestedAcceptedValue; proposalNumber = requestedProposalNumber; learner.notifyAccept("acceptorA", acceptedValue);
                `,
                "features": `
                    proposalNumber : int
                    acceptedValue: int
                    requestedProposalNumber: int
                    requestedAcceptedValue: int
                    proposerAddress: string
                `,
            },
            {
                "class": "Learner",
                "name": "learner",
                "behavior": `
                    [*] --> InitializeSystem
                    InitializeSystem --> Wait: /learnedValues = {}
                    Wait --> ProcessLearnedValue: notifyAccept(acceptor, acceptedValue) / learnedValues[acceptor] = acceptedValue; 
                    ProcessLearnedValue --> Wait
                `,
                "features": `
                    +learnedValues: dictionnary
                `,
            },
    
        ],
        connectorByName: {
    
        },
        watchExpressions: {
    
            InterleavedMessage: "IS_IN_STATE(proposerA, proposerA.Wait) && IS_IN_STATE(proposerB, proposerB.Wait) && IS_IN_STATE(acceptorA, acceptorA.AcceptPrepare) && IS_IN_STATE(acceptorB, acceptorB.AcceptPrepare) && __ROOT__acceptorA.proposerAddress !== __ROOT__acceptorB.proposerAddress",
    
        },
        "settings": {
            "semantics": {
                "fireInitialTransitions": true,
                "autoFireAfterChoice": true,
                "autoReceiveDisabled": false,
                "considerGuardsTrue": false,
                "checkEvents": true,
                "keepOneMessagePerTrigger": true,
                "enableEventPools": true,
                "matchFirst": true,
                "symbolicValues": false,
                "reactiveSystem": true,
            },
        },
    }
);
