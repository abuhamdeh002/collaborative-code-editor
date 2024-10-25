const API_BASE_URL = 'http://localhost:8080/api/documents';  // Adjust this if needed

// Fetch and display all documents
async function fetchDocuments() {
    try {
        const response = await fetch(API_BASE_URL);
        const documents = await response.json();
        displayDocuments(documents);
    } catch (error) {
        console.error('Error fetching documents:', error);
    }
}

// Display documents in the list
function displayDocuments(documents) {
    const documentList = document.getElementById('document-list');
    documentList.innerHTML = '';  // Clear the list

    documents.forEach(doc => {
        const li = document.createElement('li');
        li.textContent = doc.name;
        documentList.appendChild(li);
    });
}

// Add a new document
async function addDocument(docName) {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: docName })
        });

        if (response.ok) {
            fetchDocuments();  // Refresh the document list
        } else {
            console.error('Failed to add document:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding document:', error);
    }
}

// Handle form submission
document.getElementById('document-form').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form from submitting the traditional way
    const docName = document.getElementById('doc-name').value;
    if (docName) {
        addDocument(docName);  // Add the new document
        document.getElementById('doc-name').value = '';  // Clear input
    }
});

// Initial fetch to populate the document list
fetchDocuments();
async function addDocument(docTitle) {
    console.log("Attempting to add document: ", docTitle);  // Log the document title
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: docTitle, content: "" })  // Assuming empty content for now
        });

        console.log("API response status: ", response.status);  // Log the status of the response

        if (response.ok) {
            fetchDocuments();  // Refresh the document list
        } else {
            console.error('Failed to add document:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding document:', error);
    }
}
