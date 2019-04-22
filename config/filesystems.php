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

        's3Ibitinga' => [
            'driver' => 's3',
            'key' => 'nZwcZUh8lVyTPTr6bAtI',
            'secret' => 'liEJn5bXKrjw46ZmStVJBV0GAcfpSkVxxRsRpxRJ',
            'version' => '2006-03-01',            
            'bucket' => 'da65f4fe-e1c8-4aaa-a8df-ef17a7d03462',
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'region' => 'sao01',
        ],

        's3IbitingaServ' => [
            'driver' => 's3',
            'key' => '70SmxT4SS6xriO3Lk5QV',
            'secret' => 'n9LqLlGelWxJql1TQ9sYji0bTIbbLculx6V1LSF0',
            'version' => '2006-03-01',            
            'bucket' => 'a4ebc5c0933531e3b018dc54c9ad709b',
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'region' => 'sao01',
        ],

        's3Slserra' => [
            'driver' => 's3',
            'key' => 'nZwcZUh8lVyTPTr6bAtI',
            'secret' => 'liEJn5bXKrjw46ZmStVJBV0GAcfpSkVxxRsRpxRJ',
            'version' => '2006-03-01',            
            'bucket' => 'aa7bd982-f24d-448d-bdcf-1cc7f02f169d',
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'region' => 'sao01',
        ],
        
        's3Campos' => [
            'driver' => 's3',
            'key' => 'nZwcZUh8lVyTPTr6bAtI',
            'secret' => 'liEJn5bXKrjw46ZmStVJBV0GAcfpSkVxxRsRpxRJ',
            'version' => '2006-03-01',            
            'bucket' => 'a970d3e6-185d-47ec-9281-69ff92b51b87',
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'region' => 'sao01',
        ],

        's3Vinhedo' => [
            'driver' => 's3',
            'key' => 'nZwcZUh8lVyTPTr6bAtI',
            'secret' => 'liEJn5bXKrjw46ZmStVJBV0GAcfpSkVxxRsRpxRJ',
            'version' => '2006-03-01',            
            'bucket' => 'acdb0896-101b-4a9d-aa32-6d1b134f3961',
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'region' => 'sao01',
        ],

        // TAQUARITINGA
        
        's3TaquaritingaDoc' => [
            'driver' => 's3',
            'key' => 'yjkOvSG4IVMdTinzsFI3',
            'secret' => 'HTRnusMdrJZQNK3J6BWbdom6hAkG1NlXApXrxvfN',
            'version' => '2006-03-01',            
            'bucket' =>  '14ada9ee-664d-4059-b4b8-37366883cedd', 
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.service.networklayer.com/',
            'region' => 'sao01',
        ],

        's3TaquaritingaLOG' => [
            'driver' => 's3',
            'key' => 'yjkOvSG4IVMdTinzsFI3',
            'secret' => 'HTRnusMdrJZQNK3J6BWbdom6hAkG1NlXApXrxvfN',
            'version' => '2006-03-01',            
            'bucket' =>  '20e7ca88-9a30-4b2c-81cf-0c541522d1e9', 
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.service.networklayer.com/',
            'region' => 'sao01',
        ],

        's3TaquaritingaQuest' => [
            'driver' => 's3',
            'key' => 'yjkOvSG4IVMdTinzsFI3',
            'secret' => 'HTRnusMdrJZQNK3J6BWbdom6hAkG1NlXApXrxvfN',
            'version' => '2006-03-01',            
            'bucket' =>  '78b676e7-99a2-4725-8a3f-75c8bbcefd4f', 
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.service.networklayer.com/',
            'region' => 'sao01',
        ],

        's3TaquaritingaServ' => [
            'driver' => 's3',
            'key' => 'yjkOvSG4IVMdTinzsFI3',
            'secret' => 'HTRnusMdrJZQNK3J6BWbdom6hAkG1NlXApXrxvfN',
            'version' => '2006-03-01',            
            'bucket' =>  '09cfd574-be01-4804-9077-169947dc4e62', 
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.service.networklayer.com/',
            'region' => 'sao01',
        ],

        // VINHEDO 
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

        's3VinhedoQuest' => [
            'driver' => 's3',
            'key' => 'yjkOvSG4IVMdTinzsFI3',
            'secret' => 'HTRnusMdrJZQNK3J6BWbdom6hAkG1NlXApXrxvfN',
            'version' => '2006-03-01',            
            'bucket' =>  '726e0803-257e-4d2a-8a1a-0020d56b1c0e', 
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.service.networklayer.com/',
            'region' => 'sao01',
        ],

        's3VinhedoServ' => [
            'driver' => 's3',
            'key' => 'yjkOvSG4IVMdTinzsFI3',
            'secret' => 'HTRnusMdrJZQNK3J6BWbdom6hAkG1NlXApXrxvfN',
            'version' => '2006-03-01',            
            'bucket' =>  '8ee80b03-66be-4945-a4cf-990c7b1e969c', 
            'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
            'host' => 'http://s3.sao01.objectstorage.service.networklayer.com/',
            'region' => 'sao01',
        ],

/* EMPRESA FACIL */

        's3VinhedoEFAbertura' => [
            'driver' => 's3',
            'key' => 'Y0VwzfmoBXEjqcWmuxKJ',
            'secret' => 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA',
            'version' => '2006-03-01',            
            'bucket' =>  '323ccee6-48a1-488d-b428-833ff770c108', 
            'endpoint' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'host' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'region' => 'sao01',
        ],
        's3VinhedoEFAlteracao' => [
            'driver' => 's3',
            'key' => 'Y0VwzfmoBXEjqcWmuxKJ',
            'secret' => 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA',
            'version' => '2006-03-01',            
            'bucket' =>  '10a126dd-d5de-4255-bfe7-eb3d1211d7eb', 
            'endpoint' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'host' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'region' => 'sao01',
        ],
        's3VinhedoEFEncerramento' => [
            'driver' => 's3',
            'key' => 'Y0VwzfmoBXEjqcWmuxKJ',
            'secret' => 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA',
            'version' => '2006-03-01',            
            'bucket' =>  '9acbdd54-ddb2-420a-86d7-b2ae93fba68f', 
            'endpoint' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'host' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'region' => 'sao01',
        ],
        's3VinhedoEFLaudos' => [
            'driver' => 's3',
            'key' => 'Y0VwzfmoBXEjqcWmuxKJ',
            'secret' => 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA',
            'version' => '2006-03-01',            
            'bucket' =>  'fb08e831-37dc-46e8-9963-0a0a85895e71', 
            'endpoint' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'host' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'region' => 'sao01',
        ],
        's3VinhedoEFLiberacao' => [
            'driver' => 's3',
            'key' => 'Y0VwzfmoBXEjqcWmuxKJ',
            'secret' => 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA',
            'version' => '2006-03-01',            
            'bucket' =>  '41f53e05-41d2-4967-935f-244d733efdee', 
            'endpoint' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'host' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'region' => 'sao01',
        ],
        's3VinhedoEFRecadastramento' => [
            'driver' => 's3',
            'key' => 'Y0VwzfmoBXEjqcWmuxKJ',
            'secret' => 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA',
            'version' => '2006-03-01',            
            'bucket' =>  'e2010542-4d0b-4ddf-812c-9046ad561a55', 
            'endpoint' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'host' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'region' => 'sao01',
        ],


        
        's3ItatibaEFAbertura' => [
            'driver' => 's3',
            'key' => 'Y0VwzfmoBXEjqcWmuxKJ',
            'secret' => 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA',
            'version' => '2006-03-01',            
            'bucket' =>  'da726b49-baa0-4557-a27d-93f8be8ddbf6', 
            'endpoint' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'host' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'region' => 'sao01',
        ],
        's3ItatibaEFAlteracao' => [
            'driver' => 's3',
            'key' => 'Y0VwzfmoBXEjqcWmuxKJ',
            'secret' => 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA',
            'version' => '2006-03-01',            
            'bucket' =>  '6f5dd620-8082-4168-bbf1-7e84085f7666', 
            'endpoint' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'host' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'region' => 'sao01',
        ],
        's3ItatibaEFEncerramento' => [
            'driver' => 's3',
            'key' => 'Y0VwzfmoBXEjqcWmuxKJ',
            'secret' => 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA',
            'version' => '2006-03-01',            
            'bucket' =>  '07941482-7149-4b98-83eb-6d99bc90a5c2', 
            'endpoint' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'host' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'region' => 'sao01',
        ],
        's3ItatibaEFLaudos' => [
            'driver' => 's3',
            'key' => 'Y0VwzfmoBXEjqcWmuxKJ',
            'secret' => 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA',
            'version' => '2006-03-01',            
            'bucket' =>  '1427937f-2ec0-4e4d-bdb6-b2d4a9ff30b9', 
            'endpoint' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'host' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'region' => 'sao01',
        ],
        's3ItatibaEFLiberacao' => [
            'driver' => 's3',
            'key' => 'Y0VwzfmoBXEjqcWmuxKJ',
            'secret' => 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA',
            'version' => '2006-03-01',            
            'bucket' =>  'ecd57c08-2b64-4639-b36b-53077ab078c8', 
            'endpoint' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'host' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'region' => 'sao01',
        ],
        's3ItatibaEFRecadastramento' => [
            'driver' => 's3',
            'key' => 'Y0VwzfmoBXEjqcWmuxKJ',
            'secret' => 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA',
            'version' => '2006-03-01',            
            'bucket' =>  'a6ffcb2d-df2b-4800-83c2-f1d2b6e57958', 
            'endpoint' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'host' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'region' => 'sao01',
        ],



        
        's3BiriguiEFAbertura' => [
            'driver' => 's3',
            'key' => 'Y0VwzfmoBXEjqcWmuxKJ',
            'secret' => 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA',
            'version' => '2006-03-01',            
            'bucket' =>  '3d89d3ce-038c-4263-a851-3a5f28748a7c', 
            'endpoint' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'host' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'region' => 'sao01',
        ],
        's3BiriguiEFAlteracao' => [
            'driver' => 's3',
            'key' => 'Y0VwzfmoBXEjqcWmuxKJ',
            'secret' => 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA',
            'version' => '2006-03-01',            
            'bucket' =>  'aa6598ad-3193-4392-ab77-7992dd5fdf31', 
            'endpoint' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'host' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'region' => 'sao01',
        ],
        's3BiriguiEFEncerramento' => [
            'driver' => 's3',
            'key' => 'Y0VwzfmoBXEjqcWmuxKJ',
            'secret' => 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA',
            'version' => '2006-03-01',            
            'bucket' =>  '63a49de0-e76a-4587-97d8-ac36c55c7409', 
            'endpoint' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'host' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'region' => 'sao01',
        ],
        's3BiriguiEFLaudos' => [
            'driver' => 's3',
            'key' => 'Y0VwzfmoBXEjqcWmuxKJ',
            'secret' => 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA',
            'version' => '2006-03-01',            
            'bucket' =>  'e3062ec8-b278-4565-acac-9a17e39022b0', 
            'endpoint' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'host' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'region' => 'sao01',
        ],
        's3BiriguiEFLiberacao' => [
            'driver' => 's3',
            'key' => 'Y0VwzfmoBXEjqcWmuxKJ',
            'secret' => 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA',
            'version' => '2006-03-01',            
            'bucket' =>  'ac97dee2-13a2-4c8b-8c11-beb454285b86', 
            'endpoint' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'host' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'region' => 'sao01',
        ],
        's3BiriguiEFRecadastramento' => [
            'driver' => 's3',
            'key' => 'Y0VwzfmoBXEjqcWmuxKJ',
            'secret' => 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA',
            'version' => '2006-03-01',            
            'bucket' =>  '2e0ecb82-8202-40c3-aed4-5343cc001c4d', 
            'endpoint' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'host' => 'http://s3.sao01.cloud-object-storage.appdomain.cloud',
            'region' => 'sao01',
        ],
    ],

];

/*
Abertura = 'da726b49-baa0-4557-a27d-93f8be8ddbf6';
Alteracao = '6f5dd620-8082-4168-bbf1-7e84085f7666';
Encerramento = '07941482-7149-4b98-83eb-6d99bc90a5c2';
Laudo = '1427937f-2ec0-4e4d-bdb6-b2d4a9ff30b9';
LiberacaoUsoSolo = 'ecd57c08-2b64-4639-b36b-53077ab078c8';
Recadastramento = 'a6ffcb2d-df2b-4800-83c2-f1d2b6e57958';

   define("HOST_AWS", "http://s3.sao01.cloud-object-storage.appdomain.cloud");
   define("KEY", 'Y0VwzfmoBXEjqcWmuxKJ');
   define("SECRET_KEY", 'Qr4VEzeqisXYFvleq8uR7eMHhbDUpBRz3VoWl4UA');
*/ 


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
ca800d52-3770-4a68-9f84-63a71b9b57c0 => SÃ£o SebastiÃ£o do ParaÃ­so
2d5bc2e9-4fb2-431b-92ad-a0a572714979 => Pidamonhangaba
aa7bd982-f24d-448d-bdcf-1cc7f02f169d => São Lourenço da Serra
*/
