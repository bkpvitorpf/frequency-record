/*************************************************** 
  This is an example sketch for our optical Fingerprint sensor

  Designed specifically to work with the Adafruit Fingerprint sensor
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

// Para Arduino Leonardo / Micro ou outros com portas seriais presentes no hardware do dispositivo, remova o comentário da linha abaixo. As portas onde o RX e o TX do sensor variam de acordo com o hardware utilizado, no caso do Arduino Mega, o Serial1 encontra-se nas portas digitais 18 e 19. 

#define mySerial Serial1

// Para Arduino Uno e outros que não possuem portas seriais em seu hardware, utilizamos o software para simular portas seriais, portanto, remova o comentário da linha abaixo. Os números informados equivalem às portas utilizadas.

//SoftwareSerial mySerial(2, 3);

Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

void setup()  
{
  Serial.begin(9600);
  while (!Serial);  // For Yun/Leo/Micro/Zero/...
  delay(100);
  Serial.println("\n\nApagar digital");

  // set the data rate for the sensor serial port
  finger.begin(57600);
  
  if (finger.verifyPassword()) {
    Serial.println("Sensor biométrico encontrado!");
  } else {
    Serial.println("Não foi possível encontrar o sensor biométrico, tente novamente");
    while (1);
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
  Serial.println("Insira o id do usuário que você deseja deletar ...");
  uint8_t id = readnumber();
  if (id == 0) {// ID #0 not allowed, try again!
     return;
  }

  Serial.print("Deletando o id ");
  Serial.println(id);
  
  deleteFingerprint(id);
}

uint8_t deleteFingerprint(uint8_t id) {
  uint8_t p = -1;
  
  p = finger.deleteModel(id);

  if (p == FINGERPRINT_OK) {
    Serial.println("O id foi deletado com sucesso!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Erro de comunicação com o sensor!");
    return p;
  } else if (p == FINGERPRINT_BADLOCATION) {
    Serial.println("Não foi possível apagar a digital informada!");
    return p;
  } else if (p == FINGERPRINT_FLASHERR) {
    Serial.println("Erro de escrita!");
    return p;
  } else {
    Serial.print("Erro desconhecido: 0x"); Serial.println(p, HEX);
    return p;
  }   
}
