export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  department: string;
  admin?: boolean;
}
