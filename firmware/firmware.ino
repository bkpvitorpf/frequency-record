/*
     Projeto de Conclusão de Curso
     AUTOR:   Vitor Pereira Fontes
     DATA:    27/03/2020
     OBS:     A incialização do cartão SD deve ocorrer antes da inicialização da shieldde Ethernet W5100
*/

// Bibliotecas da Ethernet Shield e do cartão SD
#include <SPI.h>
#include <Ethernet.h>
#include <SD.h>

// Bibliotecas do RTC DS3231
#include <Wire.h>
#include "RTClib.h"

// Bibliotecas do sensor bométrico
#include <Adafruit_Fingerprint.h>

// Biblioteca do teclado de membrana
#include <Keypad.h>

// Biblioteca do display LCD
#include <LiquidCrystal_I2C.h>

// Define os pinos do LED RGB
#define pinR 30     // Pino vermelho
#define pinG 31     // Pino verde
#define pinB 32     //Pino azul

// Configurações do sensor biométrico
#define mySerial Serial1                                           // Define o uso de uma porta serial para a comunicação como sensor ( essa configuração varia para cada tipo de arduino)
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);     // Define uma instância do sensor biométrico

// Configurações do RTC
RTC_DS3231 rtc;               // Define uma instânica do RTC

// Configuração do display LCD 16X2 I2C
LiquidCrystal_I2C lcd(0x27, 2,1,0,4,5,6,7,3, POSITIVE); 

// Configurações da Ethernet Shield
byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };     // Endereço MAC
IPAddress ip(192,168,0,90);                             // Endereço IP
IPAddress myDns(192, 168, 0, 4);                        // DNS
IPAddress server(192,168,0,102);                        // IP do servidor
int port = 80;                                          // Porta que o servidor está rodando
EthernetClient client;                                  // Define um instância de um cliente

// Configurações do teclado de membrana
const byte ROWS = 4;          // Linhas
const byte COLS = 4;          // Colunas
char keys[ROWS][COLS] = {     // Definição dos números e simbolos do teclado
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};
byte rowPins[ROWS] = {40, 41, 42, 43};                                          // Pinos das linhas
byte colPins[COLS] = {44, 45, 46, 47};                                          // Pinos das colunas
Keypad myKeypad = Keypad( makeKeymap(keys), rowPins, colPins, ROWS, COLS );     // Define uma instância do teclado

// Configuração do cartão SD
File dataStorage = SD.open("registro.txt", FILE_WRITE);
const int SDCard = 4;

// Configuração do módulo buzzer
int buzzer = 8;

// Variáveis globais;
String requestBody = "GET /PCC/PHPServer/sendData.php?";
String schoolSubjects[] = {"Historia","Espanhol","Sociologia","Filosofia","ConstrucaoDeSites","PCC","EletronicaAplicada","HST",
"Portugues","Geografia","ASOR","IntalacoesEletricasAplicadas","SegurancaDaInformacao","ProgramacaoWEB"};
String modes[] = {"1","2","3"};
String courses[] = {"1","2","3","4"};
String schoolClassCode[] = {"1","2","3","4"};
String password = "40028922";
String registerData;
String request;
String inputPassword;
String inputSchoolSubjectCode;
String numberOfClasses;
String schoolClass;
String course;
String mode;

int id;

void setup() {
  // Os códigos deste bloco serão executados apenas na inicialização do Arduino

  Serial.begin(9600);         // Inicia a comunicação serial

  while (!Serial) {         // Aguarda o hardware estabelecer a comunicação com a porta serial
      ; 
  }

  lcd.begin (16,2);         // Inicia o Display LCD, informando o número de linhas e colunas
  delay(500);

  pinMode(pinR,OUTPUT);          // Define os pinos como sendo de saída
  pinMode(pinG,OUTPUT);
  pinMode(pinB,OUTPUT);

  if (!rtc.begin()) {         // Verifica se foi possivel estabelecer a comunicação com o módulo RTC
    Serial.println("Não foi possivel localizar o RTC");

    lcd.clear();
    lcd.setCursor(2,0);
    lcd.print("Problemas para");
    lcd.setCursor(1,1);
    lcd.print("iniciar o RTC");

    setColor(255,0,0);
    
    while (1);
  }else{
    if (!rtc.lostPower()) {         // Verifica se a bateria do RTC está com pouca carga
      // A linha a seguir define o modelo para ajuste da data e hora do módulo RTC
      //rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
      // A linha a seguir demonstra o exemplo utilizado para definir a data e hora do RTC
      //rtc.adjust(DateTime(2020, 9, 12, 14, 18, 0));         // Esta linha pode ser comentada após a primeira execuxão
    }else{
      Serial.println("Bateria fraca");
      
      lcd.clear();
      lcd.setCursor(4,0);
      lcd.print("RTC com");
      lcd.setCursor(1,1);
      lcd.print("bateria fraca");
      
      while(1);
    }
    Serial.println("RTC iniciado com sucesso!"); 
  }
  delay(500);

  Serial.println("Inicializando o cartão SD...");
  
  if (!SD.begin(SDCard)) {     // Verifica se o cartão está presente e se pode ser inicializado
    Serial.println("Cartão falhou,ou não está inserido");

    lcd.clear();
    lcd.setCursor(1,0);
    lcd.print("Problemas com");
    lcd.setCursor(2,1);
    lcd.print("o cartao SD");

    setColor(255,0,0);

    while (1);
  }else{
    Serial.println("O cartão foi inicializado!");
  }

  Serial.println("Inicializando Ethernet com DHCP");
  
  if (Ethernet.begin(mac) == 0) {         // Verifica se a shield conseguiu obter um endereço mac
      Serial.println("Falha ao configurar o  Ethernet usando DHCP");
      
      if (Ethernet.hardwareStatus() == EthernetNoHardware) {     // Verifica se existe algum hardware de Internet
        Serial.println("Ethernet Shield não foi encontrada. Desculpe, não é possível executar sem hardware. :(");

        lcd.clear();
        lcd.setCursor(1,0);
        lcd.print("Problemas com");
        lcd.setCursor(4,1);
        lcd.print("a shield");

        setColor(255,0,0);

        while(1);
      }
      
      if (Ethernet.linkStatus() == LinkOFF) {     // Não funciona com a Ethernet Shield W5100
        Serial.println("O Cabo de internet não está conectado!");
      }
      
      Ethernet.begin(mac, ip, myDns);     // Tenta configurar um endereço de IP estático em vez de usaro DHCP
    } else {
      Serial.print("IP atribuido pelo DHCP: ");
      Serial.println(Ethernet.localIP());
    }
    delay(500);
    
    Serial.println("Iniciando Leitor Biometrico");
  
    finger.begin(57600);     // Define a velocidade da comunicação serial com o sensor biométrico
  
    if (finger.verifyPassword()) {     // Verifica se foi possivel encontrar o sensor biométrico
      Serial.println("Leitor Biometrico Encontrado");
    }else {
      Serial.println("Leitor Biometrico nao encontrado");

      lcd.clear();
      lcd.setCursor(1,0);
      lcd.print("Problemas com");
      lcd.setCursor(2,1);
      lcd.print("a biometria");

      setColor(255,0,0);

      while (1);
    }

    createHeader();

    setColor(0,0,255);
}

void loop() {
  // Os códigos deste bloco serão executados repetidamente
  registerFrequency();
}

void registerFrequency(){
  DateTime now = rtc.now();

  int currentDay = now.dayOfTheWeek();

  switch(currentDay){
    case 1:
      DateTime now = rtc.now();
      int currentHour = now.hour();

      switch(currentHour){
        case 7:
          if(now.minute() >= 30 && now.minute() <= 40){
            id = getId();

            if(id != -1){
              processId(id);
              request = requestBody + "id=" + String(id) + "&materia=" + schoolSubjects[0] + "&curso=" + courses[0] + "&turma=" + schoolClassCode[3] + "&modalidade=" + modes[2] + "&aulas=2";
              sendRequest(request);
            }
            
          }else{
            getUserInput();
            registerExtraFrequency();
          }
        break;
        
        case 8:
          if(now.minute() >= 15 && now.minute() <= 25){
            id = getId();

            if(id != -1){
              processId(id);
              request = requestBody + "id=" + String(id) + "&materia=" + schoolSubjects[0] + "&curso=" + courses[0] + "&turma=" + schoolClassCode[3] + "&modalidade=" + modes[2] + "&aulas=2";
              sendRequest(request);
            }
            
          }else{
            getUserInput();
            registerExtraFrequency();
          }
        break;
        
        case 9:
          if(now.minute() >= 0 && now.minute() <= 10){
            id = getId();

            if(id != -1){
              processId(id);
              request = requestBody + "id=" + String(id) + "&materia=" + schoolSubjects[0] + "&curso=" + courses[0] + "&turma=" + schoolClassCode[3] + "&modalidade=" + modes[2] + "&aulas=2";
              sendRequest(request);
            }
            
          }else{
            getUserInput();
            registerExtraFrequency();
          }
        break;
        
        case 10:
          if(now.minute() >= 0 && now.minute() <= 10){
            id = getId();

            if(id != -1){
              processId(id);
              request = requestBody + "id=" + String(id) + "&materia=" + schoolSubjects[0] + "&curso=" + courses[0] + "&turma=" + schoolClassCode[3] + "&modalidade=" + modes[2] + "&aulas=2";
              sendRequest(request);
            }
            
          }else if(now.minute() >= 45 && now.minute() <= 55){
            id = getId();

              if(id != -1){
                processId(id);
                request = requestBody + "id=" + String(id) + "&materia=" + schoolSubjects[0] + "&curso=" + courses[0] + "&turma=" + schoolClassCode[3] + "&modalidade=" + modes[2] + "&aulas=2";
                sendRequest(request);
              }
          }else{
            getUserInput();
            registerExtraFrequency();
          }
        break;
        
        case 11:
          if(now.minute() >= 30 && now.minute() <= 40){
            id = getId();

            if(id != -1){
              processId(id);
              request = requestBody + "id=" + String(id) + "&materia=" + schoolSubjects[0] + "&curso=" + courses[0] + "&turma=" + schoolClassCode[3] + "&modalidade=" + modes[2] + "&aulas=2";
              sendRequest(request);
            }
            
          }else{
            getUserInput();
            registerExtraFrequency();
          }
        break;
      }
    break;
    case 2:
    break;
    case 3:
    break;
    case 4:
    break;
    case 5:
    break;
  }
  
}

boolean registerExtraFrequency(){
  Serial.println("Registrando aula extra");

  DateTime now = rtc.now();

  if(password == inputPassword){
    int schoolSubjectCode = inputSchoolSubjectCode.toInt();

    switch(schoolSubjectCode){
      case 5500:
        Serial.println("História");
        
        DateTime now = rtc.now();
        int currentMinute = now.minute();
        int count = (now.minute() + 1);

        lcd.clear();
        lcd.setCursor(3,0);
        lcd.print("Frequencia");
        lcd.print(3,1);
        lcd.print("habilitada");

        while(currentMinute <= count){
          id = getId();

          if(id != -1){
            processId(id);
            request = requestBody + "id=" + String(id) + "&materia=" + schoolSubjects[0] + "&curso=" + courses[0] + "&turma=" + schoolClassCode[3] + "&modalidade=" + modes[2] + "&aulas=2";
            sendRequest(request);
          }

          DateTime now = rtc.now();
          
          Serial.println(String(now.minute()) + " / " + String(count));

          currentMinute = now.minute();
        }
      break;

      default:
        Serial.println("Código inválido");

        lcd.clear();
        lcd.setCursor(5,0);
        lcd.print("Codigo");
        lcd.setCursor(4,1);
        lcd.print("invalido");

        delay(3000);
    }
  }else{
    Serial.println("Senha errada");
    
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Senha errada");
    lcd.setCursor(0,1);
    lcd.print("Tente novamente");
    
    delay(3000);
  }
}

void createHeader(){          // Função que cria um cabeçalho informando data, mês e ano no arquivo de registro do cartão SD
  DateTime now = rtc.now();     // Obtem os valores atuais do RTC

  if(dataStorage){
    dataStorage.println();
    dataStorage.print("=========================");
    dataStorage.print(" " + String(now.day()) + " / " + String(now.month()) + " / " + String(now.year()) + " ");
    dataStorage.println("=========================");
    dataStorage.println();
    dataStorage.close();

    Serial.println("Header criado com sucesso");
  }else{
    Serial.println("Não foi possivel encontrar o arquivo");
  }
}

int getId(){        // Função que reconhece a digital e retorna o id dela
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK)  return -1;        // Verificações da biblioteca do sensor biométrico

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK)  return -1;
  
  Serial.print("ID #");
  Serial.print(finger.fingerID); 
  Serial.print(" Encontrado com precisao de "); 
  Serial.println(finger.confidence);

  return finger.fingerID;         // Retorna o id caso a digital seja reconhecida 
}

void processId(int id){         // Função que recebe o id do usuário é responsável por indicar que a digital foi reconhecida e armazenar essa informação no cartão SD
  DateTime now = rtc.now();

  registerData = " -> ID: " + String(id) + " | Hora de registro: " + String(now.hour()) + ":" + String(now.minute()) + ":" + String(now.second());
  
  setRegister(registerData);
  
  lcd.clear();
  lcd.setCursor(1,0);
  lcd.print("Id registrado");

  setColor(0,255,0);
  tone(buzzer,2000,500);
  delay(2000);
  
  pinMode(buzzer,INPUT);
  lcd.clear();
  setColor(0,0,0);
    
}

void setRegister(String registerData){          // Função que faz o registro no arquivo do cartão SD
  if(dataStorage){
    dataStorage.println(registerData);
    dataStorage.close();
  }else{
    Serial.println("Não foi possivel encontrar o arquivo");
  }
}

void sendRequest(String request){           // Função que faz a requisição ao servidor 
  if(client,port){
    Serial.print("connected to ");
    Serial.println(client.remoteIP());
    
    client.println(request);     // Faz a requisição HTTP
    client.println("Connection: close");
    client.println();
    
    Serial.println("Requisição feita com sucesso");
    Serial.println(request);

    lcd.clear();
    lcd.setCursor(3,0);
    lcd.print("Requisicao");
    lcd.setCursor(4,1);
    lcd.print("enviada");

    delay(2000);
    lcd.clear();
    
  }else{
    Serial.println("Não foi possivel conectar-se ao servidor");
  }
}

void setColor(int red, int green, int blue){
  red = 255 - red;
  green = 255 - green;
  blue = 255 - blue;

  analogWrite(pinR,red);
  analogWrite(pinG,green);
  analogWrite(pinB,blue);
}

void getUserInput(){
  Serial.println("Digite sua senha");

  lcd.clear();
  lcd.setCursor(4,0);
  lcd.print("Teclado");
  lcd.setCursor(3,1);
  lcd.print("habilitado");

  delay(3000);
  lcd.clear();

  char key = myKeypad.getKey();

  while(key != '#'){
    key = myKeypad.getKey();
    inputPassword += String(key);
    Serial.print("*");
    lcd.print("*");
  }

  inputPassword.replace("#","");
  key = ' ';
  
  Serial.println("Digite o código da matéria");

  lcd.clear();
  lcd.setCursor(3,0);
  lcd.print("Codigo da");
  lcd.setCursor(4,1);
  lcd.print("materia");

  delay(3000);
  lcd.clear();

  while(key != '#'){
    key = myKeypad.getKey();
    inputSchoolSubjectCode += String(key);
    Serial.print("*");
    lcd.print("*");
  }

  inputSchoolSubjectCode.replace("#","");
  key = ' ';

  Serial.println("Digite a quantidade de aulas");

  lcd.clear();
  lcd.setCursor(3,0);
  lcd.print("Quantidade");
  lcd.setCursor(4,1);
  lcd.print("de aulas");

  while(key != '#'){
    key = myKeypad.getKey();
    numberOfClasses += String(key);
    Serial.print("*");
    lcd.print("*");
  }

  numberOfClasses.replace("#","");
  key = ' ';

  Serial.println("Digite o código da modalidade de ensino");

  lcd.clear();
  lcd.setCursor(3,0);
  lcd.print("Codigo da");
  lcd.setCursor(3,1);
  lcd.print("modalidade");

  while(key != '#'){
    key = myKeypad.getKey();
    mode += String(key);
    Serial.print("*");
    lcd.print("*");
  }

  mode.replace("#","");
  key = ' ';

  Serial.println("Digite o código do curso");

  lcd.clear();
  lcd.setCursor(3,0);
  lcd.print("Codigo do");
  lcd.setCursor(5,1);
  lcd.print("curso");

  while(key != '#'){
    key = myKeypad.getKey();
    course += String(key);
    Serial.print("*");
    lcd.print("*");
  }

  course.replace("#","");
  key = ' ';

  Serial.println("Digite o código da turma");

  lcd.clear();
  lcd.setCursor(3,0);
  lcd.print("Codigo da");
  lcd.setCursor(5,1);
  lcd.print("turma");

  while(key != '#'){
    key = myKeypad.getKey();
    schoolClass += String(key);
    Serial.print("*");
    lcd.print("*");
  }

  schoolClass.replace("#","");
  key = ' ';

  Serial.println("Informações salvas");

  lcd.clear();
  lcd.setCursor(2,0);
  lcd.print("Informacoes");
  lcd.setCursor(5,1);
  lcd.print("salvas");
}
