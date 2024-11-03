export interface LoginFormData {
  username: string;
  password: string;
}

export interface PaperForm {
  title: string;
  subject: string;
  year: string;
  file: File | null;
}

export interface NoticeForm {
  title: string;
  content: string;
}