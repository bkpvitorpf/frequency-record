/*************************************************** 
  This is an example sketch for our optical Fingerprint sensor

  Designed specifically to work with the Adafruit BMP085 Breakout 
  ----> http://www.adafruit.com/products/751

  These displays use TTL Serial to communicate, 2 pins are required to 
  interface
  Adafruit invests time and resources providing this open source code, 
  please support Adafruit and open-source hardware by purchasing 
  products from Adafruit!

  Written by Limor Fried/Ladyada for Adafruit Industries.  
  BSD license, all text above must be included in any redistribution
 ****************************************************/
 /*
  * Traduzido por Vitor Pereira Fontes, 4º ano de informática, IF Sertão Campus Salgueiro.
  */

#include <Adafruit_Fingerprint.h>

// On Leonardo/Micro or others with hardware serial, use those! #0 is green wire, #1 is white
// uncomment this line:
// #define mySerial Serial1

// For UNO and others without hardware serial, we must use software serial...
// pin #2 is IN from sensor (GREEN wire)
// pin #3 is OUT from arduino  (WHITE wire)
// comment these two lines if using hardware serial
SoftwareSerial mySerial(2, 3);

Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

uint8_t id;

void setup()  
{
  Serial.begin(9600);
  while (!Serial);  // For Yun/Leo/Micro/Zero/...
  delay(100);
  Serial.println("\n\nAdafruit Fingerprint, cadastro de digitais");

  // set the data rate for the sensor serial port
  finger.begin(57600);
  
  if (finger.verifyPassword()) {
    Serial.println("Sensor biométrico encontrado!");
  } else {
    Serial.println("Não foi possivel encontrar o sensor biométrico, tente novamente!");
    while (1) { delay(1); }
  }
}

uint8_t readnumber(void) {
  uint8_t num = 0;
  
  while (num == 0) {
    while (! Serial.available());
    num = Serial.parseInt();
  }
  return num;
}

void loop()                     // run over and over again
{
  Serial.println("Pronto para cadastrar uma digital!");
  Serial.println("Por favor insira o ID# que você deseja salvar para a digital ...");
  id = readnumber();
  if (id == 0) {// ID #0 not allowed, try again!
     return;
  }
  Serial.print("O ID# de cadastro é: ");
  Serial.println(id);
  
  while (!  getFingerprintEnroll() );
}

uint8_t getFingerprintEnroll() {

  int p = -1;
  Serial.print("Esperando por uma digital válida para o cadastro em #"); Serial.println(id);
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Imagem obtida!");
      break;
    case FINGERPRINT_NOFINGER:
      Serial.println(".");
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Erro de comunicação com o sensor!");
      break;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Erro na captura da digital!");
      break;
    default:
      Serial.println("Erro desconhecido!");
      break;
    }
  }

  // OK success!

  p = finger.image2Tz(1);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Imagem convertida!");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Imagem borrada,limpe o sensor ou a digital!");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Erro de comunicação com o sensor!");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Não foi possivel obter a digital!");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Não foi possivel obter a digital!");
      return p;
    default:
      Serial.println("Erro desconhecido!");
      return p;
  }
  
  Serial.println("Retire a digital do sensor!");
  delay(2000);
  p = 0;
  while (p != FINGERPRINT_NOFINGER) {
    p = finger.getImage();
  }
  Serial.print("ID "); Serial.println(id);
  p = -1;
  Serial.println("Por favor insira a mesma digital novamente");
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Imagem obtida!");
      break;
    case FINGERPRINT_NOFINGER:
      Serial.print(".");
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Erro de comunicação com o sensor!");
      break;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Erro de imagem!");
      break;
    default:
      Serial.println("Erro desconhecido!");
      break;
    }
  }

  // OK success!

  p = finger.image2Tz(2);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Imagem convertida!");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Imagem borrada,limpe o sensor ou a digital!");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Erro de comunicação com o sensor!");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Não foi possivel obter a digital!");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Não foi possivel obter a digital!");
      return p;
    default:
      Serial.println("Erro desconhecido!");
      return p;
  }
  
  // OK converted!
  Serial.print("Criando modelo para #");  Serial.println(id);
  
  p = finger.createModel();
  if (p == FINGERPRINT_OK) {
    Serial.println("As impressões batem!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Erro de comunicação com o sensor!");
    return p;
  } else if (p == FINGERPRINT_ENROLLMISMATCH) {
    Serial.println("As digitais não batem!");
    return p;
  } else {
    Serial.println("Erro desconhecido!");
    return p;
  }   
  
  Serial.print("ID "); Serial.println(id);
  p = finger.storeModel(id);
  if (p == FINGERPRINT_OK) {
    Serial.println("A digital foi armazenada com sucesso!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Erro de comunicação com o sensor!");
    return p;
  } else if (p == FINGERPRINT_BADLOCATION) {
    Serial.println("Não foi possivel armazenar a digital!");
    return p;
  } else if (p == FINGERPRINT_FLASHERR) {
    Serial.println("Erro ao armazenar a digital!");
    return p;
  } else {
    Serial.println("Erro desconhecido!");
    return p;
  }   
}
