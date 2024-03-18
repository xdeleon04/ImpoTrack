#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS with-node
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

FROM with-node AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["impotrack.client/nuget.config", "impotrack.client/"]
COPY ["ImpoTrack.Server/ImpoTrack.Server.csproj", "ImpoTrack.Server/"]
COPY ["ImpoTrack.Tests/ImpoTrack.Tests.csproj", "ImpoTrack.Tests/"]
COPY ["impotrack.client/impotrack.client.esproj", "impotrack.client/"]
RUN dotnet restore "./ImpoTrack.Tests/ImpoTrack.Tests.csproj"
RUN dotnet restore "./ImpoTrack.Server/ImpoTrack.Server.csproj"
COPY . .
WORKDIR "/src/ImpoTrack.Tests"
RUN dotnet test
WORKDIR "/src/impotrack.client"
RUN npx vitest run
WORKDIR "/src/ImpoTrack.Server"
RUN dotnet build "./ImpoTrack.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ImpoTrack.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ImpoTrack.Server.dll"]