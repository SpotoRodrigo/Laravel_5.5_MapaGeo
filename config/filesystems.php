<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default filesystem disk that should be used
    | by the framework. The "local" disk, as well as a variety of cloud
    | based disks are available to your application. Just store away!
    |
    */

    'default' => env('FILESYSTEM_DRIVER', 'public_web'),

    /*
    |--------------------------------------------------------------------------
    | Default Cloud Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Many applications store files both locally and in the cloud. For this
    | reason, you may specify a default "cloud" driver here. This driver
    | will be bound as the Cloud disk implementation in the container.
    |
    */

    'cloud' => env('FILESYSTEM_CLOUD', 's3'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | Here you may configure as many filesystem "disks" as you wish, and you
    | may even configure multiple disks of the same driver. Defaults have
    | been setup for each driver as an example of the required options.
    |
    | Supported Drivers: "local", "ftp", "s3", "rackspace"
    |
    */

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app'),
        ],

        'public_web' => [
            'driver' => 'local',
            'root' => public_path(),
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        's3Paraiso' => [
            'driver' => 's3',
            'key' => 'nZwcZUh8lVyTPTr6bAtI',
            'secret' => 'liEJn5bXKrjw46ZmStVJBV0GAcfpSkVxxRsRpxRJ',
            'version' => '2006-03-01',            
            'bucket' => 'ca800d52-3770-4a68-9f84-63a71b9b57c0',
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'region' => 'sao01',
        ],

        's3Biri' => [
            'driver' => 's3',
            'key' => 'nZwcZUh8lVyTPTr6bAtI',
            'secret' => 'liEJn5bXKrjw46ZmStVJBV0GAcfpSkVxxRsRpxRJ',
            'version' => '2006-03-01',            
            'bucket' => 'db156448-a8ea-41ec-a312-db835a94399b',
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'region' => 'sao01',
        ],

        's3Lorena' => [
            'driver' => 's3',
            'key' => 'nZwcZUh8lVyTPTr6bAtI',
            'secret' => 'liEJn5bXKrjw46ZmStVJBV0GAcfpSkVxxRsRpxRJ',
            'version' => '2006-03-01',            
            'bucket' => '39f409a7-da21-4260-a07a-c469a22b707d',
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'region' => 'sao01',
        ],

        's3Itatiba' => [
            'driver' => 's3',
            'key' => 'nZwcZUh8lVyTPTr6bAtI',
            'secret' => 'liEJn5bXKrjw46ZmStVJBV0GAcfpSkVxxRsRpxRJ',
            'version' => '2006-03-01',            
            'bucket' => '58b506c6-57e4-413e-8d24-ee7198b4355a',
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'region' => 'sao01',
        ],

        's3VinhedoDoc' => [
            'driver' => 's3',
            'key' => 'yjkOvSG4IVMdTinzsFI3',
            'secret' => 'HTRnusMdrJZQNK3J6BWbdom6hAkG1NlXApXrxvfN',
            'version' => '2006-03-01',            
            'bucket' =>  'ba84f1b8-ee11-4c0c-ad77-8bf91c71a5ae', 
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.service.networklayer.com/',
            'region' => 'sao01',
        ],

        's3VinhedoLOG' => [
            'driver' => 's3',
            'key' => 'yjkOvSG4IVMdTinzsFI3',
            'secret' => 'HTRnusMdrJZQNK3J6BWbdom6hAkG1NlXApXrxvfN',
            'version' => '2006-03-01',            
            'bucket' =>  '67596c42-7326-4575-8481-5b2e3651ee24', 
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.service.networklayer.com/',
            'region' => 'sao01',
        ],

        's3Artur' => [
            'driver' => 's3',
            'key' => 'nZwcZUh8lVyTPTr6bAtI',
            'secret' => 'liEJn5bXKrjw46ZmStVJBV0GAcfpSkVxxRsRpxRJ',
            'version' => '2006-03-01',            
            'bucket' => '70e17193-8514-4acb-8dee-9f57170debfc',
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'region' => 'sao01',
        ],

        's3Registro' => [
            'driver' => 's3',
            'key' => 'nZwcZUh8lVyTPTr6bAtI',
            'secret' => 'liEJn5bXKrjw46ZmStVJBV0GAcfpSkVxxRsRpxRJ',
            'version' => '2006-03-01',            
            'bucket' => '89b230d3-12a6-4db4-ae32-7426a3953ea8',
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'region' => 'sao01',
        ],

        's3Socorro' => [
            'driver' => 's3',
            'key' => 'nZwcZUh8lVyTPTr6bAtI',
            'secret' => 'liEJn5bXKrjw46ZmStVJBV0GAcfpSkVxxRsRpxRJ',
            'version' => '2006-03-01',            
            'bucket' => '3ef077e8-fd6f-4ad5-bfef-2a55570b6367',
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'region' => 'sao01',
        ],
    ],

];

/*
70e17193-8514-4acb-8dee-9f57170debfc => Artur Nogueira
89b230d3-12a6-4db4-ae32-7426a3953ea8 => Registro
da65f4fe-e1c8-4aaa-a8df-ef17a7d03462 => Ibitinga
db156448-a8ea-41ec-a312-db835a94399b => Birigui
acdb0896-101b-4a9d-aa32-6d1b134f3961 => Vinhedo
ba84f1b8-ee11-4c0c-ad77-8bf91c71a5ae => Vinhedo Pessoas documentos
58b506c6-57e4-413e-8d24-ee7198b4355a => Itatiba
3ef077e8-fd6f-4ad5-bfef-2a55570b6367 => Socorro
39f409a7-da21-4260-a07a-c469a22b707d => Lorena
ca800d52-3770-4a68-9f84-63a71b9b57c0 => São Sebastião do Paraíso
2d5bc2e9-4fb2-431b-92ad-a0a572714979 => Pidamonhangaba
*/
