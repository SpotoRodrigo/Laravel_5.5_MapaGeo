<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class ProcessVinhedoHab implements ShouldQueue
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
SELECT  serv.servicoIdentificadorUnico , fich.codFichaIdentUnico ,  descricao , LocalArquivo , ImagemNome , case when imagemfoto is null then  0 else 1 end as Cartuchada 
FROM BDGeralVinhedoImagem.dbo.Imagem          as imag
   , BDGeralVinhedo.habitacao.FichaHabitacao  as fich
   , BDServicoVinhedo.organizacao.Servico     as serv
WHERE imag.TipoFoto = 'Documento'  
  AND assunto = 'Habitacao'
 -- AND len(imag.localArquivo) > 60
  AND imag.localArquivo is not null 
  AND imag.ImagemNome is not null 
  AND fich.codFicha = imag.keyFotoNumerica
  and serv.servicoIndetificador = 19 
order by imag.localArquivo 

*/