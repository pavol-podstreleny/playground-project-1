# Test docker file
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS builder-stage
WORKDIR /src
COPY CustomerAPI.Test/CustomerAPI.Test.csproj .
WORKDIR /CustomerAPI/
COPY /CustomerAPI/CustomerAPI.csproj .
WORKDIR /src
RUN dotnet restore CustomerAPI.Test.csproj
COPY . .
CMD ["dotnet", "test"] 

