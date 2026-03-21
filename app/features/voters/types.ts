export interface RawVoter {
    id: number;
    epic_number: string;
    first_name_english: string;
    last_name_english: string;
    gender: string;
    age: number;
    state: string;
    assembly_constituency: string;
    parliamentary_constituency: string;
    part_number_name: string;
    part_serial_number: number;
}

export interface PaginatedVotersData {
    votersPaginated: {
        rows: RawVoter[];
        total: number;
        page: number;
        limit: number;
    };
}

export interface VotersPageVariables {
    page: number;
    limit: number;
    search?: string;
    assembly_constituency?: string;
    parliamentary_constituency?: string;
}

export interface VoterFilterOptionsData {
    voterFilterOptions: {
        assembly_constituencies: string[];
        parliamentary_constituencies: string[];
    };
}

export interface VoterListVM {
    id: number;
    epicNumber: string;
    fullNameEnglish: string;
    genderAge: string;
    state: string;
    assemblyConstituency: string;
    parliamentaryConstituency: string;
    partNumberName: string;
    partSerialNumber: number;
}

export function toVoterListVM(voter: RawVoter): VoterListVM {
    return {
        id: voter.id,
        epicNumber: voter.epic_number,
        fullNameEnglish: `${voter.first_name_english} ${voter.last_name_english}`.trim(),
        genderAge: `${voter.gender} / ${voter.age}`,
        state: voter.state,
        assemblyConstituency: voter.assembly_constituency,
        parliamentaryConstituency: voter.parliamentary_constituency,
        partNumberName: voter.part_number_name,
        partSerialNumber: voter.part_serial_number,
    };
}
