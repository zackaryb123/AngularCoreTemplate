export interface Case {
  id: string;
  timestamp: string;
  title: string;
  plot: string;
  victim: Victim;
  suspects: Suspect[];
  witnesses: Witness[];
  clues: string[]; // guessing game form
  murderWeapon: string;
  criminal: string; // name of suspect
}

export interface Victim {
  age: string;
  education: string;
  evidence: string[]; // Gives away clue evidence (answer clue questions unlock more details)
  maritalStatus: string;
  occupation: string;
  residence: string;
}

export interface Suspect {
  age: string;
  education: string;
  interrogation: [];
  maritalStatus: string;
  occupation: string;
  residence: string;
  alibi: string;
}

export interface Witness {
  age: string;
  education: string;
  views: string[];
  maritalStatus: string;
  occupation: string;
  residence: string;
}
