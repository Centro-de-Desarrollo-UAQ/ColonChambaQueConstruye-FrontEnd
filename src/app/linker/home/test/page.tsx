import { Welcome } from '@/components/landing-page-company/Welcome';




export default function LinkerPage(){
    return(
        <>
              <div className="bg-zinc-50">
                <div className="space-y-4 pt-20 pb-20 bg-[url(/Foto_Propuesta_JA.jpg)] bg-cover bg-center bg-no-repeat">
                  <Welcome />
                </div>
                
              
              </div>
            </>
    )
}