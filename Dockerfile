FROM node:12

# oclif / `npm run build` uses 7zip to make the Windows binary
# nsis is for making windows installers with makensis

RUN apt-get update && apt-get install -y p7zip-full nsis