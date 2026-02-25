#!/usr/bin/perl
use strict;
use warnings;




# first, create your message
use Email::MIME;
my $message = Email::MIME->create(
  header_str => [
    From    => 'you@example.com',
    To      => 'friend@example.com',
    Subject => 'Happy birthday!',
  ],
  attributes => {
    encoding => 'quoted-printable',
    charset  => 'ISO-8859-1',
  },
  body_str => "Happy birthday to you!\n",
);



# send the message
use Email::Sender::Simple qw(sendmail);
sendmail($message);

my $dbh = DBI->connect($dsn,$user,$pass) or die "Cannot connect to DB\n";
my $username = <STDIN>;
# Could just as easily be from CGI
my $password = <STDIN>;

chomp($username,$password);
# Authenticate the user before allowing them access to their account.
# Verify that username and password match what is in the database.
my $result = $dbh->selectrow_hashref(" SELECT account_details FROM accounts WHERE user = '$username' AND password = '$password' ");

var http = require('http'); var url = require('url'); var server = http.createServer(function (request, response) { var queryData = url.parse(request.url, true).query; }