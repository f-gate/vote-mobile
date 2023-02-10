export type Referendums= {
    referendumsOnGoing: ReferendumOnGoing[];
    referendumsFinished: ReferendumFinished[];
};


export type ReferendumOnGoing = {
    id: number;
    info: OnGoing;
};
export type ReferendumFinished = {
    id: number;
    info: Finished;
};


export type Finished = {
    approved: boolean;
    end: string;
};

export type OnGoing = {
    delay: string;
    end: string;
    proposal: Proposal;
    threshold: string;
    tally: Tally;
};

type Tally = {
    ayes: string;
    nays: string;
    turnout: string;
};
type Proposal = {
    lookup: Lookup;
};
type Lookup = {
    hash: string;
    len: number;
};

