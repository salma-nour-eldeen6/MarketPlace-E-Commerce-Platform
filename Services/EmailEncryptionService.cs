using System.Security.Cryptography;
using System.Text;

namespace IA_marketPlace.Services
{
    public class EmailEncryptionService : IEmailEncryptionService
    {
        private readonly string _key = "12345678901234567890123456789012";
        private readonly string _iv = "1234567890123456";

        public string Encrypt(string plainText)
        {
            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Key = Encoding.UTF8.GetBytes(_key);
                aesAlg.IV = Encoding.UTF8.GetBytes(_iv);

                ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

                using (MemoryStream msEncrypt = new MemoryStream())
                using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                {
                    swEncrypt.Write(plainText);
                    swEncrypt.Flush();
                    csEncrypt.FlushFinalBlock();
                    return Convert.ToBase64String(msEncrypt.ToArray());
                }
            }
        }


        public string Decrypt(string encryptedText)
        {
            try
            {
                using (Aes aesAlg = Aes.Create())
                {
                    aesAlg.Key = Encoding.UTF8.GetBytes(_key);
                    aesAlg.IV = Encoding.UTF8.GetBytes(_iv);

                    ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

                    using (MemoryStream msDecrypt = new MemoryStream(Convert.FromBase64String(encryptedText)))
                    using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                    using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                    {
                        return srDecrypt.ReadToEnd();
                    }
                }
            }
            catch (FormatException ex)
            {
                throw new Exception("Encrypted text is not valid Base64: " + encryptedText, ex);
            }
            catch (Exception ex)
            {
                throw new Exception("Decryption failed: " + ex.Message, ex);
            }
        }

    }
}



