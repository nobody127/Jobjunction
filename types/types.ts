export type TextComponentType = {
  text: string;
  className?: string;
};

export type ThemeStoreType = {
  theme: string;
  toggleTheme: () => void;
};

export type FieldsMarqueeType = {
  field: string;
  jobs: number;
  applied: string;
};

export type GetAllPostResponseType = {
  status: number;
  data: JobLisitingType[] | [];
  message: string;
};

export type JobLisitingType = {
  id: string;
  apply_link: string;
  company: string;
  experience_level: string;
  job_type: string;
  location: string;
  position: string;
  role_description: string;
  role_name: string;
  salary_max: number;
  salary_min: number;
  author: {
    id: string;
    avatar: string | null;
    username: string;
  };
};
