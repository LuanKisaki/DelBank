import { Request, Response } from "express";
import axios from "axios";

interface StatusDetails {
  message: string;
  description: string;
}

// Lista de códigos HTTP válidos (100 a 599)
const isValidHttpCode = (code: number): boolean => code >= 100 && code <= 599;

const localStatusDetails: Record<string, StatusDetails> = {
  "100": {
    message: "Continue",
    description: "O cliente deve continuar com sua solicitação.",
  },
  "101": {
    message: "Switching Protocols",
    description: "O servidor aceita trocar o protocolo de comunicação.",
  },
  "200": {
    message: "OK",
    description: "A solicitação foi bem-sucedida.",
  },
  "201": {
    message: "Created",
    description: "A solicitação foi bem-sucedida e um novo recurso foi criado.",
  },
  "202": {
    message: "Accepted",
    description:
      "A solicitação foi aceita para processamento, mas ainda não concluída.",
  },
  "204": {
    message: "No Content",
    description:
      "A solicitação foi bem-sucedida, mas não há conteúdo para retornar.",
  },
  "301": {
    message: "Moved Permanently",
    description:
      "O recurso solicitado foi movido para uma nova URL permanentemente.",
  },
  "302": {
    message: "Found",
    description:
      "O recurso solicitado foi temporariamente movido para uma nova URL.",
  },
  "400": {
    message: "Bad Request",
    description:
      "O servidor não conseguiu processar a solicitação devido a um erro do cliente.",
  },
  "401": {
    message: "Unauthorized",
    description: "A autenticação é necessária para acessar o recurso.",
  },
  "403": {
    message: "Forbidden",
    description: "O servidor recusou a solicitação, mesmo autenticado.",
  },
  "404": {
    message: "Not Found",
    description: "O recurso solicitado não foi encontrado.",
  },
  "500": {
    message: "Internal Server Error",
    description:
      "O servidor encontrou um erro inesperado ao processar a solicitação.",
  },
  "502": {
    message: "Bad Gateway",
    description:
      "O servidor recebeu uma resposta inválida de um servidor upstream.",
  },
  "503": {
    message: "Service Unavailable",
    description:
      "O servidor está temporariamente indisponível, geralmente devido a manutenção ou sobrecarga.",
  },
  "504": {
    message: "Gateway Timeout",
    description:
      "O servidor não recebeu uma resposta oportuna de um servidor upstream.",
  },
};

export const getStatusDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { code } = req.params;

  // Validação: Verificar se o código é um número válido
  const parsedCode = parseInt(code, 10);
  if (isNaN(parsedCode) || !isValidHttpCode(parsedCode)) {
      res.status(400).json({ error: "O código fornecido não é um código HTTP válido. Deve estar entre 100 e 599." });
      return;
  }

  // Verifica os dados locais
  if (localStatusDetails[code]) {
    res.json({ code: parseInt(code), ...localStatusDetails[code] });
    return;
  }

  // Busca detalhes na API pública
  try {
    const response = await axios.get(`https://httpstatuses.com/${code}`);
    res.json({
      code: parseInt(code),
      message: "Informação adicional encontrada",
      description: "Descrição disponível no site https://httpstatuses.com.",
      details: response.data,
    });
  } catch (error) {
    res.status(404).json({ error: "Status HTTP não encontrado." });
  }
};
