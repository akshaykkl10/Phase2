import { login } from "@/api/apiClient";

export async function loginSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const form = event.currentTarget;
    const formdata = new FormData(form);
    const email = formdata.get('email') as string;
    const password = formdata.get('password') as string;
   
    const response = await login(email, password);
    console.log(response)
    return response
}