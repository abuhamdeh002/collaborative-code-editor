package com.example.collaborativeeditor.service;

import com.example.collaborativeeditor.model.Document;
import java.util.List;

public interface DocumentService {
    List<Document> getAllDocuments();
    Document getDocumentById(Long id);
    Document saveDocument(Document document);
    void deleteDocument(Long id);
}
