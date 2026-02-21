# API Keys & Configuration — Legal Disclaimer

> **Last updated:** February 2026

## 1. Scope

This disclaimer applies to all API keys, secrets, tokens, and credentials referenced in the configuration of the **Open Agent School** frontend and the **openagent-backend** microservices, including but not limited to:

| Variable / Secret | Provider |
|---|---|
| `VITE_OPENAI_API_KEY` | OpenAI |
| `VITE_AZURE_OPENAI_API_KEY` | Microsoft Azure OpenAI Service |
| `VITE_GEMINI_API_KEY` | Google Gemini |
| `VITE_HUGGINGFACE_API_KEY` | Hugging Face |
| `VITE_OPENROUTER_API_KEY` | OpenRouter |
| `VITE_ANTHROPIC_API_KEY` | Anthropic |
| `OPENROUTER_API_KEY` | OpenRouter (backend) |
| `SECRET_KEY` | JWT / session signing |
| `API_KEYS` | Service-to-service authentication |
| `MICROSOFT_CLIENT_ID` / `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth |
| `AZURE_OPENAI_ENDPOINT` / `AZURE_OPENAI_KEY` | Azure OpenAI (Knowledge Service) |

## 2. No Warranty

THE SOFTWARE AND ALL ACCOMPANYING CONFIGURATION TEMPLATES (INCLUDING `.env.example` FILES) ARE PROVIDED **"AS IS"**, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. THE PROJECT MAINTAINERS MAKE NO REPRESENTATIONS OR WARRANTIES REGARDING THE SECURITY, RELIABILITY, OR AVAILABILITY OF ANY THIRD-PARTY API OR SERVICE REFERENCED IN THIS CONFIGURATION.

## 3. User Responsibility

By using this software, **you acknowledge and agree** that:

1. **API Keys Are Your Property.** You are solely responsible for obtaining, managing, rotating, and revoking your own API keys from each respective provider (OpenAI, Azure, Google, Anthropic, Hugging Face, OpenRouter, etc.).

2. **Costs and Billing.** Any charges incurred through the use of third-party APIs are your sole financial responsibility. Open Agent School has no control over, and accepts no liability for, billing, rate limits, overages, or pricing changes imposed by any API provider.

3. **Secure Storage.** You must store all API keys and secrets securely. Never commit plaintext keys to version control. Use environment variables, secret managers, or encrypted vaults in production environments. The `.env.example` file is a **template only** — it must never contain real credentials.

4. **Key Exposure.** If any API key is accidentally exposed (e.g., committed to a public repository, logged to console, or transmitted insecurely), you are responsible for immediately revoking and rotating the compromised key with the corresponding provider.

5. **Client-Side Key Exposure Risk.** API keys prefixed with `VITE_` are embedded into the frontend bundle at build time and **are visible to end users** in the browser. You accept the inherent risk of embedding keys in client-side code. Where possible, proxy API calls through a backend service to avoid exposing keys.

6. **Third-Party Terms of Service.** You are bound by the terms of service, acceptable use policies, and data processing agreements of every third-party API provider whose keys you configure. It is your responsibility to review and comply with those terms.

7. **No Endorsement.** Reference to any third-party service or API in this project does not constitute an endorsement, partnership, or affiliation with that provider.

## 4. Data Privacy and Compliance

- Data sent to third-party APIs (prompts, documents, user inputs) may be processed, stored, or used for training by those providers unless their terms explicitly state otherwise.
- If you operate this software in a jurisdiction subject to data protection regulations (e.g., GDPR, CCPA, HIPAA), you are solely responsible for ensuring compliance, including obtaining user consent and executing appropriate data processing agreements with API providers.
- The project maintainers are not data processors for any data you transmit to third-party services.

## 5. Service Availability

- Open Agent School depends on third-party APIs that may experience downtime, deprecation, or breaking changes at any time.
- The project maintainers are not responsible for service interruptions, API deprecations, or changes to third-party authentication mechanisms.
- The software is designed to degrade gracefully when backend services or API keys are unavailable; however, full functionality is not guaranteed under such conditions.

## 6. Security Best Practices

The following are **recommendations**, not obligations of the project:

- Rotate API keys periodically.
- Use the principle of least privilege — issue keys with only the permissions required.
- Restrict API keys by IP address, referrer, or service account where the provider supports it.
- Monitor API usage dashboards for unexpected activity.
- Use a secrets manager (e.g., Azure Key Vault, AWS Secrets Manager, HashiCorp Vault) in production.
- Never log API keys or secrets to application logs.

## 7. Limitation of Liability

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE PROJECT MAINTAINERS, CONTRIBUTORS, OR COPYRIGHT HOLDERS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES (INCLUDING, BUT NOT LIMITED TO, LOSS OF DATA, LOSS OF PROFITS, UNAUTHORIZED ACCESS, OR BUSINESS INTERRUPTION) ARISING OUT OF OR IN CONNECTION WITH THE USE, MISUSE, OR INABILITY TO USE ANY API KEY OR THIRD-PARTY SERVICE CONFIGURED WITHIN THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

## 8. Indemnification

You agree to indemnify and hold harmless the project maintainers and contributors from and against any claims, damages, losses, or expenses (including reasonable legal fees) arising from your use or misuse of API keys, your violation of any third-party provider's terms of service, or your failure to secure credentials as described herein.

## 9. Changes to This Disclaimer

This disclaimer may be updated at any time. Continued use of the software after changes are published constitutes acceptance of the revised terms.

---

*This disclaimer supplements the [MIT License](LICENSE) under which the software is distributed. In the event of conflict, the MIT License governs the distribution of the software itself, while this disclaimer governs the configuration and use of third-party API keys and services.*
