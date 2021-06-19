FROM mcr.microsoft.com/dotnet/sdk:5.0 AS builder-stage
WORKDIR /src
COPY CustomerAPI.csproj .
RUN dotnet restore CustomerAPI.csproj
COPY . .
RUN dotnet publish CustomerAPI.csproj -c Release -o /src/publish

FROM mcr.microsoft.com/dotnet/aspnet:5.0

ARG BUILD_NUMBER=0
ARG BUILD_TAG=local

LABEL version="1.0"
LABEL build_number=${BUILD_NUMBER}
LABEL build_tag=${BUILD_TAG}

WORKDIR /app
COPY --from=builder-stage /src/publish .
ENTRYPOINT ["dotnet", "CustomerAPI.dll"]