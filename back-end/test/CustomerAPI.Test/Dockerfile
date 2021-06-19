# Test docker file
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS builder-stage
WORKDIR /app

COPY ["src/CustomerAPI/CustomerAPI.csproj", "src/CustomerAPI/"]
COPY ["test/CustomerAPI.Test/CustomerAPI.Test.csproj", "test/CustomerAPI.Test/"]
COPY . .

RUN dotnet restore "test/CustomerAPI.Test/CustomerAPI.Test.csproj"
RUN dotnet restore "src/CustomerAPI/CustomerAPI.csproj"

ARG BUILD_NUMBER=0
ARG BUILD_TAG=local

LABEL version="1.0"
LABEL build_number=${BUILD_NUMBER}
LABEL build_tag=${BUILD_TAG}

CMD dotnet test "test/CustomerAPI.Test/CustomerAPI.Test.csproj" --collect:"XPlat Code Coverage"

