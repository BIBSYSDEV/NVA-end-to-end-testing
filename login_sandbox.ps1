python3 ..\aws-cli-tools\samlauth\samlauth.py -a NVAsandbox
python3 .\aws.py | ForEach-Object {
    #Expecting all result to be $env:NAME=VALUE for variables that need to be set
    $a = $_ -replace '\$env:(\w+)=(.*)', '$1;$2' -split ';'

    #Setting variables at process-level. Can be replaced with "User" and "Machine" for permanent variables
    [System.Environment]::SetEnvironmentVariable($a[0], $a[1], "Process")
}
[System.Environment]::SetEnvironmentVariable("CYPRESS_AWS_USER_POOL_ID", "eu-west-1_Fto5AuFGa", "Process")
[System.Environment]::SetEnvironmentVariable("CYPRESS_AWS_CLIENT_ID", "55h2kkdaljjq693fsp1h05tbbj", "Process")
