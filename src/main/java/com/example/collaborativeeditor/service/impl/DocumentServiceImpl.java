// src/main/java/com/example/collaborativeeditor/service/impl/DocumentServiceImpl.java
package com.example.collaborativeeditor.service.impl;

import com.example.collaborativeeditor.model.Document;
import com.example.collaborativeeditor.repository.DocumentRepository;
import com.example.collaborativeeditor.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentServiceImpl implements DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Override
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    @Override
    public Document getDocumentById(Long id) {
        return documentRepository.findById(id).orElse(null);
    }

    @Override
    public Document saveDocument(Document document) {
        return documentRepository.save(document);
    }

    @Override
    public void deleteDocument(Long id) {
        documentRepository.deleteById(id);
    }
}
