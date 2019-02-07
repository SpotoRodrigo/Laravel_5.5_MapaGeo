<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for all database work. Of course
    | you may use many connections at once using the Database library.
    |
    */

    'default' => env('DB_CONNECTION', 'pgsql_mitra'),

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the database connections setup for your application.
    | Of course, examples of configuring each database platform that is
    | supported by Laravel is shown below to make development simple.
    |
    |
    | All database work in Laravel is done through the PHP PDO facilities
    | so make sure you have the driver for your particular database of
    | choice installed on your machine before you begin development.
    |
    */

    'connections' => [

        'sqlite' => [
            'driver' => 'sqlite',
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix' => '',
        ],

        'mysql' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'strict' => true,
            'engine' => null,
        ],

        'pgsql' => [
            'driver' => 'pgsql',
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '5432'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'schema' => 'public',
            'sslmode' => 'prefer',
        ],
        'pgsql_mitra' => [
            'driver' => 'pgsql',
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '5432'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'schema' => 'public',
            'sslmode' => 'prefer',
        ],

        'pgsql_paraiso' => [
            'driver' => 'pgsql',
            'host' =>  '127.0.0.1',
            'port' => env('DB_PORT', '5432'),
            'database' => 'bd_mitra_ssparaiso',
            'username' => env('DB_USERNAME', 'postgres'),
            'password' => 'VgQ1512p',
            'charset' => 'utf8',
            'prefix' => '',
            'schema' => 'apgv',
            'sslmode' => 'prefer',
        ],

     'pgsql_lorena' => [
            'driver' => 'pgsql',
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '5432'),
            'database' => 'bd_mitra_lorena',
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'schema' => 'public',
            'sslmode' => 'prefer',
        ],

     'pgsql_itatiba' => [
            'driver' => 'pgsql',
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '5432'),
            'database' => 'bd_mitra_itatiba',
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'schema' => 'public',
            'sslmode' => 'prefer',
        ],

        'sqlsrv' => [
            'driver' => 'sqlsrv',
            'host' => env('DB_HOST', 'localhost'),
            'port' => env('DB_PORT', '1433'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => '',
        ],

        'BDGeralSSebastiaoImagem' => [
            'driver' => 'sqlsrv',
            'host' => env('DB_MITRA_HOST1', '10.150.199.226'),
            'port' => env('DB_MITRA_PORT', '1433'),
            'database' => 'BDGeralSSebastiaoImagem',
            'username' => env('DB_MITRA_USER', 'scaes'),
            'password' => env('DB_MITRA_PASS', 'sql08081972'),
            'charset' =>' cp1252',
            'collation'=> 'Latin1_General_CI_AS',
            'prefix' => '',
        ],

        'BDGeralLorenaImagem' => [
            'driver' => 'sqlsrv',
            'host' => env('DB_MITRA_HOST1', '10.150.199.226'),
            'port' => env('DB_MITRA_PORT', '1433'),
            'database' => 'BDGeralLorenaImagem',
            'username' => env('DB_MITRA_USER', 'scaes'),
            'password' => env('DB_MITRA_PASS', 'sql08081972'),
            'charset' =>' cp1252',
            'collation'=> 'Latin1_General_CI_AS',
            'prefix' => '',
          //  'pooling' => false
           // 'sticky'    => true,
        ],

     'BDGeralItatiba' => [
            'driver' => 'sqlsrv',
            'host' =>   env('DB_MITRA_HOST2', '10.150.199.254'),
            'port' => env('DB_MITRA_PORT', '1433'),
            'database' => 'BDGeralItatiba',
            'username' => env('DB_MITRA_USER', 'scaes'),
            'password' => env('DB_MITRA_PASS', 'sql08081972'),
            'charset' =>' cp1252',
            'collation'=> 'Latin1_General_CI_AS',
            'prefix' => '',
            'pooling' => false,
           'sticky'    => true,
        ],

        'BDServicoVinhedo' => [
            'driver' => 'sqlsrv',  
            'host' =>   env('DB_MITRA_HOST2', '10.150.199.205'),      // 10.150.199.248 //169.57.159.46 Vinhedo BDGeral  E FOI PARA 169.57.166.53  -- 10.150.199.205 
            'port' => env('DB_MITRA_PORT', '1433'),
            'database' => 'BDServicoVinhedo',
            'username' => env('DB_MITRA_USER', 'scaes'),
            'password' => env('DB_MITRA_PASS', 'sql08081972'),
            'charset' =>' cp1252',
            'collation'=> 'Latin1_General_CI_AS',
            'prefix' => '',
          //  'pooling' => false,
          // 'sticky'    => true,
        ]
    ],
            // 10.150.199.248 //169.57.159.46 Vinhedo BDGeral
            ///'charset'  => 'cp1252', //  and also latin1 and utf8
            //'collation'=> 'Latin1_General_CI_AS', // both with this on/off 

    /*
    |--------------------------------------------------------------------------
    | Migration Repository Table
    |--------------------------------------------------------------------------
    |
    | This table keeps track of all the migrations that have already run for
    | your application. Using this information, we can determine which of
    | the migrations on disk haven't actually been run in the database.
    |
    */

    'migrations' => 'migrations',

    /*
    |--------------------------------------------------------------------------
    | Redis Databases
    |--------------------------------------------------------------------------
    |
    | Redis is an open source, fast, and advanced key-value store that also
    | provides a richer set of commands than a typical key-value systems
    | such as APC or Memcached. Laravel makes it easy to dig right in.
    |
    */

    'redis' => [

        'client' => 'predis',

        'default' => [
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'password' => env('REDIS_PASSWORD', null),
            'port' => env('REDIS_PORT', 6379),
            'database' => 0,
        ],

    ],

];
