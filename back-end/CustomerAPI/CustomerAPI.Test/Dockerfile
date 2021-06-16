FROM mcr.microsoft.com/dotnet/sdk:5.0 AS builder-stage
WORKDIR /src
COPY CustomerAPI.Test.csproj CustomerAPI.Test/
COPY ../CustomerAPI/CustomerAPI.csproj CustomerAPI/
WORKDIR /src/CustoemrAPI.Test
RUN dotnet restore CustomerAPI.Test.csproj
COPY . .
CMD ["dotnet", "test"] 

