python3 ..\aws-cli-tools\samlauth\samlauth.py -a NVAdev
python3 .\aws.py | ForEach-Object {
    #Expecting all result to be $env:NAME=VALUE for variables that need to be set
    $a = $_ -replace '\$env:(\w+)=(.*)', '$1;$2' -split ';'

    #Setting variables at process-level. Can be replaced with "User" and "Machine" for permanent variables
    [System.Environment]::SetEnvironmentVariable($a[0], $a[1], "Process")
}