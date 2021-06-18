# Test docker file
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS builder-stage
WORKDIR /app
COPY ["src/CustomerAPI/CustomerAPI.csproj", "CustomerAPI/"]
COPY ["test/CustomerAPI.Test/CustomerAPI.Test.csproj", "CustomerAPI.Test/"]
COPY . .
RUN dotnet restore "CustomerAPI.Test/CustomerAPI.Test.csproj"
RUN dotnet restore "CustomerAPI/CustomerAPI.csproj"
CMD dotnet test "CustomerAPI.Test/CustomerAPI.Test.csproj"

