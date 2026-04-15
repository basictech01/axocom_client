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
    part_number_name?: string;
}

export interface VoterFilterOptionsData {
    voterFilterOptions: {
        assembly_constituencies: string[];
    };
}

export interface VoterFilterOptionsByAssemblyData {
    voterFilterOptionsByAssembly: {
        parliamentary_constituencies: string[];
        part_number_names: string[];
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

function safeNamePart(value: unknown): string {
    if (typeof value !== "string") return "";
    const trimmed = value.trim();
    if (!trimmed) return "";
    if (trimmed.toLowerCase() === "null") return "";
    return trimmed;
}

function joinNameParts(...parts: unknown[]): string {
    return parts.map(safeNamePart).filter(Boolean).join(" ");
}

export function toVoterListVM(voter: RawVoter): VoterListVM {
    return {
        id: voter.id,
        epicNumber: voter.epic_number,
        fullNameEnglish: joinNameParts(voter.first_name_english, voter.last_name_english),
        genderAge: `${voter.gender} / ${voter.age}`,
        state: voter.state,
        assemblyConstituency: voter.assembly_constituency,
        parliamentaryConstituency: voter.parliamentary_constituency,
        partNumberName: voter.part_number_name,
        partSerialNumber: voter.part_serial_number,
    };
}

/** Full voter shape from `voter(id)` query — matches backend `Voter` / DB row. */
export interface RawVoterProfile {
    id: number;
    epic_number: string;
    first_name_english: string;
    first_name_local: string;
    last_name_english: string;
    last_name_local: string;
    gender: string;
    age: number;
    relative_first_name_english: string;
    relative_first_name_local: string;
    relative_last_name_english: string;
    relative_last_name_local: string;
    state: string;
    parliamentary_constituency: string;
    assembly_constituency: string;
    polling_station: string;
    part_number_name: string;
    part_serial_number: number;
    created_at: string;
}

export interface VoterProfileVM {
    id: number;
    epicNumber: string;
    displayName: string;
    displayNameLocal: string;
    firstNameEnglish: string;
    firstNameLocal: string;
    lastNameEnglish: string;
    lastNameLocal: string;
    gender: string;
    age: number;
    relativeName: string;
    relativeNameLocal: string;
    state: string;
    parliamentaryConstituency: string;
    assemblyConstituency: string;
    pollingStation: string;
    partNumberName: string;
    partSerialNumber: number;
    createdAt: string;
}

export function toVoterProfileVM(data: RawVoterProfile): VoterProfileVM {
    return {
        id: data.id,
        epicNumber: data.epic_number,
        displayName: joinNameParts(data.first_name_english, data.last_name_english),
        displayNameLocal: joinNameParts(data.first_name_local, data.last_name_local),
        firstNameEnglish: data.first_name_english,
        firstNameLocal: data.first_name_local,
        lastNameEnglish: data.last_name_english,
        lastNameLocal: data.last_name_local,
        gender: data.gender,
        age: data.age,
        relativeName: joinNameParts(
            data.relative_first_name_english,
            data.relative_last_name_english
        ),
        relativeNameLocal: joinNameParts(
            data.relative_first_name_local,
            data.relative_last_name_local
        ),
        state: data.state,
        parliamentaryConstituency: data.parliamentary_constituency,
        assemblyConstituency: data.assembly_constituency,
        pollingStation: data.polling_station,
        partNumberName: data.part_number_name,
        partSerialNumber: data.part_serial_number,
        createdAt: data.created_at,
    };
}

export interface VoterByIdData {
    voter: RawVoterProfile | null;
}

export interface VoterByIdVariables {
    id: number;
}
