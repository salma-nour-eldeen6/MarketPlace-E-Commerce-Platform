using System.Security.Cryptography;
using System.Text;

namespace IA_marketPlace.Services
{
    public class EmailEncryptionService : IEmailEncryptionService
    {
        private readonly string _key = "12345678901234567890123456789012";

        public string Encrypt(string plainText)
        {
            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Key = Encoding.UTF8.GetBytes(_key);
                aesAlg.GenerateIV();

                var iv = aesAlg.IV;
                var encryptor = aesAlg.CreateEncryptor(aesAlg.Key, iv);

                using var msEncrypt = new MemoryStream();
                using var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write);
                using var swEncrypt = new StreamWriter(csEncrypt);

                swEncrypt.Write(plainText);
                swEncrypt.Flush();
                csEncrypt.FlushFinalBlock();

                var encryptedContent = msEncrypt.ToArray();

                return Convert.ToBase64String(iv) + ":" + Convert.ToBase64String(encryptedContent);
            }
        }

        public string Decrypt(string encryptedText)
        {
            try
            {
                var parts = encryptedText.Split(':');
                if (parts.Length != 2)
                    throw new Exception("Invalid encrypted format");

                var iv = Convert.FromBase64String(parts[0]);
                var cipherText = Convert.FromBase64String(parts[1]);

                using (Aes aesAlg = Aes.Create())
                {
                    aesAlg.Key = Encoding.UTF8.GetBytes(_key);
                    aesAlg.IV = iv;

                    ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

                    using (MemoryStream msDecrypt = new MemoryStream(cipherText))
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


