dotnet tool install -g dotnet-reportgenerator-globaltool
reportgenerator "-reports:$args"  "-targetdir:coveragereport" -reporttypes:Html
