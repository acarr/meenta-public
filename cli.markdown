---
layout: default
title: Meenta Command Line
published: true
---

<style>
  pre {
		padding: 10px;
		margin-left: 0px;
		margin-right: 30px;
		background-color: #DFDFDF;
	}
	code {
		padding: 0px;
		padding-left: 5px;
		padding-right: 5px;
		background-color: #DFDFDF;
	}
</style>

Meenta offers a command line tool to work with our
account, instruments and samples. It is designed to provide secure
access to the Meenta Cloud, for secure file storage and transfer,
as well as labs who are interested in integration with our API.

<h4 style="font-weight: bold; font-size: 26px;">Installation</h4>

    npm install -g https://github.com/Meenta/meenta-cli/tarball/master

<h4 style="font-weight: bold; font-size: 26px;">Getting Started</h4>
You need an account. You need to generate API keys. Go to the web application and
use the Account -> Setting -> API to generate a token and secret. The CLI
will maintain your session.

    % meenta login [token] [secret]

<h4 style="font-weight: bold; font-size: 26px;">Upload Sample Data</h4>
If you are a host and need to upload sample data, used the following.

    % meenta sample upload <sampleId> <file>

<h4 style="font-weight: bold; font-size: 26px;">Download Sample Data</h4>
If you are a user and need to download/receive your sample data, use the following.

    % meenta sample download <sampleId> <file>

<h4 style="font-weight: bold; font-size: 26px;">Features & Commands</h4>
The CLI application has its own internal help support.

- ``meenta help`` - Get cli help.

Sample Commands:
- ``meenta sample list`` - Get a list of all sample/projects for your account.
- ``meenta sample data`` - Get a list of all project data files.
- ``meenta sample get <id>`` - Get details for a sample/project.
- ``meenta sample upload <id> <file>`` - Upload a file to the sample storage.
- ``meenta sample download <sampleId> <file>`` - Download a data file.

Instrument Commands:
- ``meenta instrument list`` - Get a list of all instruments for your account.
- ``meenta instrument get <id>`` - Get an instrument details.

Account Commands:
- ``meenta login <token> <secret>`` - Login into account.
- ``meenta logout`` - Log out of the CLI.
- ``meenta whoami`` - Get information about current session/environment.
- ``meenta use <environment>`` - Change the current environment. For Dev Only.
