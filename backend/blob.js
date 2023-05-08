const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
require("dotenv").config();
const CSVParser = require('papaparse')

const movieBlobsNames = {
  snacks: 'Snacks_1.csv',
  booking: 'booking.csv',
  customer: 'customer.csv',
  movies: 'moviesdatabase.csv',
  snack_booking: 'snack_booking.csv',
  theatre: 'theatre.csv',
  ticket: 'ticket.csv'
}

const AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=bookingsystemblob;AccountKey=axtXx4YFJdrOgT2Lj84xn/SfEEocVi0k8pc9hTpc9rG8xnVpM+CoZVG3hui4R7ehKQZ/aPBb/mAO+AStWldpAA==;EndpointSuffix=core.windows.net'
// Create the BlobServiceClient object with connection string
const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);

// Get a reference to a container
const movieContainer = blobServiceClient.getContainerClient('movie-system');

const snacksClient = movieContainer.getBlockBlobClient(movieBlobsNames.snacks)
const bookingClinet = movieContainer.getBlockBlobClient(movieBlobsNames.booking)
const customerClient = movieContainer.getBlockBlobClient(movieBlobsNames.customer)
const moviesClient = movieContainer.getBlockBlobClient(movieBlobsNames.movies)
const snackBookingClient = movieContainer.getBlockBlobClient(movieBlobsNames.snack_booking)
const theatreClient = movieContainer.getBlockBlobClient(movieBlobsNames.theatre)
const ticketClient = movieContainer.getBlockBlobClient(movieBlobsNames.ticket)

// Convert stream to text
async function streamToText(readable) {
  readable.setEncoding('utf8');
  let data = '';
  for await (const chunk of readable) {
    data += chunk;
  }
  return data;
}


async function main() {
  try {
    console.log("Azure Blob storage v12 - JavaScript quickstart sample");

    // Quick start code goes here

  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error('Azure Storage Connection string not found');
  }




  console.log('\nListing blobs...');

  // List the blob(s) in the container.
  // for await (const blob of movieContainer.listBlobsFlat()) {
  //   // Get Blob Client from name, to get the URL
  //   const tempBlockBlobClient = movieContainer.getBlockBlobClient(blob.name);

  //   // Display blob name and URL
  //   console.log(
  //     `\n\tname: ${blob.name}\n\tURL: ${tempBlockBlobClient.url}\n`
  //   );
  // }

  // Get blob content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
  const downloadBlockBlobResponse = await snackBookingClient.download(0);
  console.log('\nDownloaded blob content...');
  const data = await streamToText(downloadBlockBlobResponse.readableStreamBody)
  console.log(
    '\t',
    data
  );

  CSVParser.parse(data, {
    header: true,
    complete: function(results) {
      console.log("Finished:", results.data);
    }
  })



  } catch (err) {
    console.err(`Error: ${err.message}`);
  }
}

main()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));