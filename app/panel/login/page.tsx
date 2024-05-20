import { FormLogin } from "@/components/panel/FormLogin";
import Image from "next/image";

export default function Login() {
    return (
        <>
            <div className="w-full px-4">
                <div className="w-full max-w-bisyouContainer mx-auto my-10">
                    <div className="border border-slate-200 rounded-xl flex flex-col gap-5 py-10 max-w-[600px] mx-auto">
                        <figure className="w-[150px] mx-auto">
                            <Image
                                src="/assets/img/logo-small_large.webp"
                                alt="logo-bisyou"
                                width={150}
                                height={100}
                            />
                        </figure>

                        <small className="text-center mx-auto text-slate-400 text-sm max-w-[60%]">
                            Utilize o formulário abaixo para entrar no seu
                            painel administrativo
                        </small>

                        <div>
                            <FormLogin />
                        </div>

                        <small className="text-center mx-auto text-slate-400 text-sm max-w-[60%]">
                            <a href="#" className="hover:underline">
                                Esqueceu sua senha?
                            </a>
                        </small>
                    </div>
                </div>
            </div>
        </>
    );
}
