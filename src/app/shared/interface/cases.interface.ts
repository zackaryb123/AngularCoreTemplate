export interface Case {
  title: string;
  description: string;
  clues: Clue[];
  murderWeapons: MurderWeapon[];
  questions: ClueQuestion[];
  suspects: Suspect[];
  victim: Victim;
  witnesses: Witness[];
  timestamp: string;
}

export interface Clue {
  clue: string;
}

export interface MurderWeapon {
  weapon: string;
}

export interface ClueQuestion {
  question: string;
}

export interface Suspect {
  age: string;
  education: string;
  ethnic: string;
  family: FamilyMember[];
  friends: Friend[];
  interest: string[];
  dislikes: string[];
  maritalStatus: string;
  occupation: string;
  residence: string;
  alibi: string;
}

export interface Victim {
  age: string;
  education: string;
  ethnic: string;
  family: FamilyMember[];
  friends: Friend[];
  interest: string[];
  dislikes: string[];
  maritalStatus: string;
  occupation: string;
  residence: string;
}

export interface FamilyMember {
  age: string;
  occupation: string;
  residence: string;
  education: string;
  thoughts: string[];
  alibi: string;
}

export interface Friend {
  age: string;
  occupation: string;
  residence: string;
  education: string;
  thoughts: string[];
  alibi: string;
}

export interface Witness {
  age: string;
  education: string;
  ethnic: string;
  family: FamilyMember[];
  friends: Friend[];
  interest: string[];
  dislikes: string[];
  maritalStatus: string;
  occupation: string;
  residence: string;
}
