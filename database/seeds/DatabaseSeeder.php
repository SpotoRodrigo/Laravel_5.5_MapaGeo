<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       // $this->call(UsersTableSeeder::class);
        factory(\App\User::class,1)->create([
            'name'=>'Rodrigo Spoto',
            'email'=>'spoto@mapa.com',
            'password'=>bcrypt('spoto00'),
            'role'=> \App\User::ROLE_ADMIN
        ]);

        factory(\App\User::class,1)->create([
            'name'=>'João da Silva',
            'password'=>bcrypt('spoto00'),
            'email'=>'user@user.com'
        ]);

        DB::table('entidades')->insert([
            'nome'=>'Mitra',
            'nome_abrev'=>'mitra',
            'logo'=>'20180828184016.gif'
        ]);

        DB::table('entidades')->insert([
            'nome'=>'Birigui',
            'nome_abrev'=>'birigui',
            'logo'=>'20180828181650.jpeg'
        ]);

        DB::table('camadas')->insert([
            'titulo' => 'DigitalGlobe Satellite', 
            'layer' => 'arcgisonline',
            'servidor' => 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' ,
            'servidor_tipo' => 0 ,
            'conexao_tipo' => 0,
            'entidade_id' => 1
        ]);


        DB::table('camadas')->insert([
            'titulo' => 'Open Street Map', 
            'layer' => 'padrao',
            'servidor' => 'https://www.openstreetmap.org' ,
            'servidor_tipo' => 0 ,
            'conexao_tipo' => 0,
            'entidade_id' => 1
        ]);

        
        DB::table('camadas')->insert([
            'titulo' => 'Limite Municipal', 
            'layer' => 'Birigui:Municipio',
            'servidor' => 'http://mapas.mitracidadesinteligentes.com.br:8080/geoserver' ,
            'servidor_tipo' => 2 ,
            'conexao_tipo' => 1,
            'entidade_id' => 2
        ]);
        
        DB::table('camadas')->insert([
            'titulo' => 'Limítrofes', 
            'layer' => 'Birigui:Limitrofes',
            'servidor' => 'http://mapas.mitracidadesinteligentes.com.br:8080/geoserver' ,
            'servidor_tipo' => 2 ,
            'conexao_tipo' => 1,
            'entidade_id' => 2
        ]);   

        DB::table('camadas')->insert([
            'titulo' => 'Imagem Aérea', 
            'layer' => 'Birigui:Raster',
            'servidor' => 'http://mapas.mitracidadesinteligentes.com.br:8080/geoserver' ,
            'servidor_tipo' => 2 ,
            'conexao_tipo' => 2,
            'entidade_id' => 2
        ]);
    }
}
