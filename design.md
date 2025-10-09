<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Concept 2: Geometric Modern (Static)</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #f0f2f5;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            width: 100%;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 32, 96, 0.1);
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 650px;
        }

        /* LEFT PANEL - FORM */
        .form-panel {
            padding: 50px;
            background: white;
            position: relative;
        }

        /* Decorative diagonal lines - top right corner */
        .form-panel::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 250px;
            height: 200px;
            background: repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 8px,
                rgba(255, 149, 0, 0.12) 8px,
                rgba(255, 149, 0, 0.12) 10px
            );
            clip-path: polygon(100% 0, 100% 100%, 0 0);
            pointer-events: none;
        }

        .form-panel h2 {
            color: #002060;
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 700;
            position: relative;
        }

        .form-panel h2::after {
            content: '';
            display: block;
            width: 60px;
            height: 4px;
            background: #FF9500;
            margin-top: 15px;
            border-radius: 2px;
        }

        .form-panel p {
            color: #666;
            margin-bottom: 35px;
            font-size: 14px;
            margin-top: 20px;
        }

        .form-group {
            margin-bottom: 22px;
        }

        .form-group label {
            display: block;
            color: #002060;
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 13px 16px;
            border: 2px solid #E8E8E8;
            border-radius: 6px;
            font-size: 14px;
            transition: all 0.3s ease;
            background: #FAFAFA;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #FF9500;
            background: white;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(255, 149, 0, 0.15);
        }

        .form-group textarea {
            resize: vertical;
            min-height: 90px;
        }

        /* RIGHT PANEL - DASHBOARD */
        .dashboard-panel {
            padding: 50px;
            background: #002060;
            position: relative;
            overflow: hidden;
            color: white;
        }

        /* Static subtle light effect - left corner */
        .light-effect-1 {
            position: absolute;
            top: -60px;
            left: -60px;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(74, 144, 226, 0.3) 0%, rgba(74, 144, 226, 0.15) 35%, rgba(74, 144, 226, 0.06) 55%, transparent 75%);
            border-radius: 50%;
            pointer-events: none;
        }

        /* Static subtle light effect - right corner */
        .light-effect-2 {
            position: absolute;
            bottom: -60px;
            right: -60px;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(255, 149, 0, 0.25) 0%, rgba(255, 149, 0, 0.12) 35%, rgba(255, 149, 0, 0.05) 55%, transparent 75%);
            border-radius: 50%;
            pointer-events: none;
        }

        .dashboard-content {
            position: relative;
            z-index: 1;
        }

        .dashboard-panel h3 {
            font-size: 26px;
            margin-bottom: 15px;
            font-weight: 700;
            position: relative;
            display: inline-block;
        }

        .dashboard-panel h3::before {
            content: '';
            position: absolute;
            left: -15px;
            top: 0;
            width: 5px;
            height: 100%;
            background: #FF9500;
            border-radius: 3px;
        }

        .dashboard-panel p {
            font-size: 15px;
            line-height: 1.7;
            margin-bottom: 35px;
            opacity: 0.9;
        }

        .feature-list {
            margin: 30px 0;
        }

        .feature-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 20px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 8px;
            border-left: 3px solid #FF9500;
            transition: all 0.3s ease;
        }

        .feature-item:hover {
            background: rgba(255, 255, 255, 0.12);
            transform: translateX(5px);
        }

        .feature-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #FF9500, #FFA500);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            flex-shrink: 0;
            font-weight: bold;
            font-size: 18px;
        }

        .feature-text h4 {
            font-size: 16px;
            margin-bottom: 5px;
            font-weight: 600;
        }

        .feature-text p {
            font-size: 13px;
            margin: 0;
            opacity: 0.85;
        }

        .badge-container {
            display: flex;
            gap: 10px;
            margin-top: 30px;
            flex-wrap: wrap;
        }

        .badge {
            padding: 8px 16px;
            background: rgba(255, 149, 0, 0.2);
            border: 1px solid rgba(255, 149, 0, 0.4);
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            color: #FFB347;
        }

        /* BUTTONS */
        .button-group {
            display: flex;
            gap: 12px;
            margin-top: 40px;
        }

        .btn-primary {
            flex: 1;
            padding: 15px 30px;
            background: linear-gradient(135deg, #FF9500 0%, #FFA500 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 15px rgba(255, 149, 0, 0.3);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 149, 0, 0.4);
            background: linear-gradient(135deg, #FF8500 0%, #FF9500 100%);
        }

        .btn-secondary {
            flex: 1;
            padding: 15px 30px;
            background: transparent;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.4);
            border-radius: 8px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: white;
            transform: translateY(-2px);
        }

        @media (max-width: 768px) {
            .container {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- LEFT PANEL: FORM -->
        <div class="form-panel">
            <h2>Request a Quote</h2>
            <p>Connect with our expert team for professional language services</p>
            
            <form>
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" placeholder="Enter your name" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" placeholder="your.email@company.com" required>
                </div>
                
                <div class="form-group">
                    <label for="company">Company</label>
                    <input type="text" id="company" placeholder="Company name">
                </div>
                
                <div class="form-group">
                    <label for="service">Service Type</label>
                    <select id="service" required>
                        <option value="">Choose service</option>
                        <option value="interpretation">Interpretation</option>
                        <option value="translation">Translation</option>
                        <option value="localization">Localization</option>
                        <option value="consulting">Consulting</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="message">Project Details</label>
                    <textarea id="message" placeholder="Describe your project requirements..."></textarea>
                </div>
            </form>
        </div>

        <!-- RIGHT PANEL: DASHBOARD -->
        <div class="dashboard-panel">
            <!-- Static Light Effects -->
            <div class="light-effect-1"></div>
            <div class="light-effect-2"></div>
            
            <div class="dashboard-content">
                <h3>Why Choose Us?</h3>
                <p>Experience the difference of working with industry-leading language professionals trusted by Fortune 500 companies.</p>
                
                <div class="feature-list">
                    <div class="feature-item">
                        <div class="feature-icon">✓</div>
                        <div class="feature-text">
                            <h4>Instant Access</h4>
                            <p>Connect with qualified interpreters in seconds, 24/7</p>
                        </div>
                    </div>
                    
                    <div class="feature-item">
                        <div class="feature-icon">★</div>
                        <div class="feature-text">
                            <h4>Expert Linguists</h4>
                            <p>Certified professionals with industry specialization</p>
                        </div>
                    </div>
                    
                    <div class="feature-item">
                        <div class="feature-icon">⚡</div>
                        <div class="feature-text">
                            <h4>Fast Turnaround</h4>
                            <p>Quick response times without compromising quality</p>
                        </div>
                    </div>
                </div>

                <div class="badge-container">
                    <div class="badge">580+ Languages</div>
                    <div class="badge">35,000+ Interpreters</div>
                    <div class="badge">ISO Certified</div>
                </div>

                <div class="button-group">
                    <button class="btn-primary">Submit Request</button>
                    <button class="btn-secondary">Call Us</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>