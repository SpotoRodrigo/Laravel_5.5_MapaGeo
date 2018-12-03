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

        's3' => [
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
    ],

];

/*


            'key' => env('nZwcZUh8lVyTPTr6bAtI'),
            'secret' => env('liEJn5bXKrjw46ZmStVJBV0GAcfpSkVxxRsRpxRJ'),


                $client = S3Client::factory([
                    'credentials' => [
                        'key'    => 'nZwcZUh8lVyTPTr6bAtI',
                        'secret'  => 'liEJn5bXKrjw46ZmStVJBV0GAcfpSkVxxRsRpxRJ',
                        
                    ],
                    'region' => 'sao01',
                    'version' => '2006-03-01',
                    'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
                    'sslEnabled'=> true
                ]);
*/