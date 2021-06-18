# Test docker file
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS builder-stage
WORKDIR /app
COPY ["src/CustomerAPI/CustomerAPI.csproj", "src/CustomerAPI/"]
COPY ["test/CustomerAPI.Test/CustomerAPI.Test.csproj", "test/CustomerAPI.Test/"]
COPY . .
RUN dotnet restore "test/CustomerAPI.Test/CustomerAPI.Test.csproj"
RUN dotnet restore "src/CustomerAPI/CustomerAPI.csproj"
CMD dotnet test "test/CustomerAPI.Test/CustomerAPI.Test.csproj"

