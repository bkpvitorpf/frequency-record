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
 /**************************************************
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

  Serial.println("\n\nApagando todos os templates de impressões digitais registradas ...");
  Serial.println("Pressione a tecla 'Y' para confirmar");

  while (1) {
    if (Serial.available() && (Serial.read() == 'Y')) {
      break;
    }
  }

  // set the data rate for the sensor serial port
  finger.begin(57600);
  
  if (finger.verifyPassword()) {
    Serial.println("Sensor biométrico encontrado!");
  } else {
    Serial.println("Não foi possível encontrar o sensor biométrico, tente novamente!");
    while (1);
  }
  
  finger.emptyDatabase();

  Serial.println("Limpeza concluída! Todos os dados foram apagados com sucesso!");
}

void loop() {
}
