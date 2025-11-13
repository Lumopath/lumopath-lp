// Function to send status to DatoCMS
async function sendStatus(status) {
  try {
    // Determine which branch is being built
    const branch = process.env.VERCEL_GIT_COMMIT_REF;

    let webhookUrl;

    if (branch === 'dev') {
      webhookUrl = process.env.DATO_DEV_WEBHOOK;
    } else if (branch === 'main') {
      webhookUrl = process.env.DATO_MAIN_WEBHOOK;
    } else {
      console.log(
        `No DatoCMS webhook configured for branch "${branch}", skipping...`
      );
      return;
    }

    if (!webhookUrl) {
      console.log('Webhook URL not defined, skipping...');
      return;
    }

    // Send POST request to DatoCMS webhook
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    console.log(
      `DatoCMS webhook sent for branch "${branch}" with status "${status}". Response status: ${res.status}`
    );
  } catch (err) {
    console.error('Error sending DatoCMS webhook:', err);
  }
}

// Send success status after build
sendStatus('success');

// Listen for unhandled rejections or uncaught exceptions and send error status
process.on('unhandledRejection', () => sendStatus('error'));
process.on('uncaughtException', () => sendStatus('error'));
