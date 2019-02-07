<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class ProcessVinhedoRdp implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //
    }
}

/*
SELECT  TipoFoto , count(*)
FROM dbo.Imagem
where TipoFoto != 'Foto Fachada'  and assunto != 'Habitacao' 
group by TipoFoto 
order by TipoFoto 

--Cert. Conclusão Obra	202
--Croqui	   22
--Documento	    3
--Habite-se	 9128
--Matricula	 5972
--Planta Cad.	3


SELECT assunto , TipoFoto ,  localArquivo , count(*)
FROM dbo.Imagem
where TipoFoto != 'Foto Fachada' and len(localArquivo) < 60  and assunto != 'Habitacao' and TipoFoto !=  'Croqui'
group by localArquivo  , assunto , TipoFoto 
order by TipoFoto  ,localArquivo 
*/