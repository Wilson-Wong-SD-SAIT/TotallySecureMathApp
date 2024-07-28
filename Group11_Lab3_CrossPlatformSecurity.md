# ITSC302-B Software Security
### Lab 3 – Cross-Platform Security (Group 11)  
- Wong Ping Lun, Wilson
- Yuen Ki Fung, Harry
- Sun King Chung, Cathy

# 1. Secure Data Storage
### 1.1 Vulnerability Description
Insecurely storing sensitive data such as passwords in plain text in local memory without encryption.
### 1.2 How the Vulnerability could Cause
Attackers can quickly access and utilize this data if the device is compromised, which could result in unwanted access and data breaches.
### 1.3 Security Assessment of the Totally Security Math App
Password is hardcoded and not stored in separate database:
![Image01](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image001.png)
### 1.4 Security Measure Implemented and Why it is Important
User account and password is now stored securely in firebase with hashed value:
![Image03](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image003.png)
Storing data securely in Firebase with hashed values significantly enhances security by ensuring that no unauthorized access and usage of data. And data is held by an authorized third-party defense system with robust security system. 

# 2. Authentication Enhancement
### 2.1 Vulnerability Description
Using static credentials and client-side validation for improper user authentication.
### 2.2 How the Vulnerability could Cause
Due to this approach's susceptibility to replay attacks and credential theft, unauthorized users may access the program without the necessary authentication.
### 2.3 Security Assessment of the Totally Security Math App
Password field is not masked

![Image05](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image005.png)
### 2.4 Security Measure Implemented and Why it is Important
Password field is now masked and linked with firebase:

Sample Login ID: test@test.com

Password: 2dfdsf0@jd3CJ

![Image07](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image007.png)

![Image10](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image010.png)

Masking the password field prevents shoulder surfing attacks where onlookers might see the password as it is being entered. Linking accounts with Firebase leverages Firebase's robust authentication mechanism, providing a more secure and reliable authentication process that reduces the risk of unauthorized access.

# 3. Code Injection Prevention
### 3.1 Vulnerability Description
This vulnerability is about allowing user input to be processed without proper sanitization or validation.
### 3.2 How the Vulnerability could Cause
Attackers may inject malicious code or scripts, which may cause the application to crash, alter data, or allow unauthorized users to do operations.
### 3.3 Security Assessment of the Totally Security Math App
The app should avoid using eval() function, because eval() function allows hackers to inject malicious code (such as a function with infinite loop), which may cause the application difficult to debug, slow down, and may even lead to service outage.

![Image12](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image012.png)

The original test result shows the app was accepting function string, for example

var bar = 3;var baz = 1;function addStuff() {  return bar + baz;}addStuff(); 

as input and the function can be executed after clicking the “EVALUATE” button:

![Image14](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image014.png)

![Image16](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image016.png)

### 3.4 Security Measure Implemented and Why it is Important
It is suggested to replace the eval() with another function that will only evaluate user input as a math expression. A good alternative is to use math.evaluate(). This function can be used after installing the mathjs module (by command npm install mathjs).

![Image18](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image018.png)

The test result shows the math equation can be evaluated correctly by using the math.evaluate() function:

![Image20](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image020.png)

![Image22](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image022.png)

![Image24](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image024.png)

Replacing eval() with math.evaluate() ensures that only mathematical expressions are evaluated, preventing code injection attacks. To further enhance the security, it is important to perform input validation before passing the value to the math.evaluate() function. For details, please refer to section 4.

# 4. Input Validation
### 4.1 Vulnerability Description
This vulnerability is about failing to properly validate user inputs for expected data types and formats.
### 4.2 How the Vulnerability could Cause
This vulnerability can result in unexpected behavior, crashes, or security vulnerabilities such as buffer overflows, SQL injection, or cross-site scripting (XSS).
### 4.3 Security Assessment of the Totally Security Math App
Math equation should be validated to ensure it only contains combination of digits and operation symbols. 

![Image26](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image026.png)

It is also necessary to use try-catch block to catch the error. Otherwise, uncaught error will be shown on the screen.

![Image28](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image028.png)

### 4.4 Security Measure Implemented and Why it is Important
To fix this vulnerability, input validation should be implemented to ensure user input math equation is a combination of digits and operands. 

![Image30](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image030.png)

Besides, try-catch block should be added while evaluating the user input, this can prevent uncaught error shows on the app screen:

![Image32](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image032.png)

The new test result shows input is validated while user clicks the “ADD NOTE” button. If the user input is not matched with the regular expression, the app will prompt user to input a valid math equation:

![Image34](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image034.png)

![Image36](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image036.png)

Input validation ensures that only valid data is processed by the application, preventing injection attacks and other vulnerabilities. Using a try-catch block for error handling prevents the application from crashing and provides a better user experience by displaying appropriate error messages.

# 5. Secure Coding Practices
### 5.1 Vulnerability Description
Writing code that does not adhere to security best practices, such as the use of hardcoded credentials, improper error handling or lack of access control.
### 5.2 How the Vulnerability could Cause
These can put the app at risk for a number of security issues, making it simpler for hackers to take advantage of weaknesses and jeopardize the data and integrity of the program.
### 5.3 Security Assessment of the Totally Security Math App
Hardcoded credentials in code base:

![Image01](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image001.png)

Improper error handling with vague message:

![Image40](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image040.png)

### 5.4 Security Measure Implemented and Why it is Important
Firebase keys for login are saved in .env files, values are mapped with keys and can separate from application code: 

![Image41](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image041.png)

Error handling in try and catch block with precise message replied:

![Image43](https://raw.githubusercontent.com/cathysunkc/public/main/Security/image043.png)

Storing Firebase keys in .env files separates sensitive data from the application code, making it less accessible and more secure. Implementing proper error handling with specific messages helps in identifying and addressing issues accurately, improving both security and the overall user experience.

### 6. Reflection
Several serious vulnerabilities were found and fixed during the Totally Security Math App's security update, greatly enhancing the app's security. 
##### 6.1 Secure Data Storage 
Passwords and other sensitive information were initially kept in plain text, which made it simple for hackers to read if the device was compromised. We made sure that even in the event that data is accessed, it cannot be decrypted without the hash key by utilizing Firebase to safely store hashed passwords. This modification emphasizes how crucial safe data storage procedures are for safeguarding private data. 
##### 6.2 Authentication Enhancement 
The app originally used static credentials and client-side validation, which are vulnerable to replay attacks and credential theft. We improved security by implementing dynamic server-side authentication and masking the password field. This ensures that user identities are securely verified, preventing unauthorized access. This demonstrates the need for robust authentication mechanisms to safeguard user data. 
##### 6.3 Code Injection Prevention 
User input was previously processed without proper validation, leaving the app vulnerable to code injection attacks. We mitigated this risk by avoiding the use of functions like eval() and enforcing strict input validation using math.evaluate(). This prevents malicious code from altering data or causing application crashes, emphasizing the necessity of secure coding practices to prevent injection attacks. 
##### 6.4 Input Validation 
One serious security vulnerability was improper input handling. Through the use of thorough input validation, we made sure that only secure, correctly formed data is handled. The significance of thorough input validation is highlighted by the necessity of this step in averting attacks that take advantage of unvalidated inputs. 
##### 6.5 Secure Coding Practices 
Adopting secure coding practices was essential throughout this project. By avoiding hardcoding sensitive information, implementing proper error handling, and conducting regular security audits, we improved the app's security and maintainability. This highlights the importance of continuous security best practices in developing resilient applications. 
##### Conclusion 
The security improvements made to the Totally Security Math App have significantly strengthened its defense against various threats. By addressing vulnerabilities in data storage, authentication, code injection, and input validation, we have created a more secure and reliable application. This project has demonstrated the importance of proactive security measures and ongoing assessments to maintain a secure application environment. 

### 7. Modules Required to Execute the Updated Application
- npm install react-native-encrypted-storage 
- npm install mathjs 
- npm install dotenv 
- npm install @react-native-async-storage/async-storage 
- npm install firebase @react-native-firebase/app @types/firebase 
